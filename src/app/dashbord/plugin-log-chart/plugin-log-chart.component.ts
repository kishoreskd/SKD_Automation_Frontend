import { Component, ContentChild, Input, OnChanges, OnInit, SimpleChanges, ViewChild, input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PluginLog } from '../../domain/model/plugin-log.model';
import { PluginLogService } from '../../services/plugin-services/plugin-log.service';
import { Plugin } from '../../domain/model/plugin.model';
import { PluginService } from '../../services/plugin-services/plugin-base.service';
Chart.register(...registerables);

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];


@Component({
  selector: 'app-plugin-log-chart',
  templateUrl: './plugin-log-chart.component.html',
  styleUrls: ['./plugin-log-chart.component.css']
})
export class PluginLogChartComponent implements OnInit, OnChanges {

  _pluginId: number;
  _chart: Chart;
  _data: Array<any> = new Array<any>();
  _count: Array<any> = new Array<any>();
  _pluginLogCol: Array<PluginLog>;
  _pluginsCol: Array<Plugin>;
  _selectedMonthPlugingLog: number;
  _selectedYearPluginLog: number;

  constructor(private _pluginService: PluginService, private _pluginLogService: PluginLogService) {
    this._pluginsCol = new Array<Plugin>();
    this._pluginLogCol = new Array<PluginLog>();
  }

  onPuginSelectionChange(event: any) {
    this._pluginId = event.value;
    this.refreshPluginLog();
  }

  ngOnInit() {
    const today = new Date();
    this._selectedMonthPlugingLog = today.getMonth() + 1;
    this._selectedYearPluginLog = today.getFullYear();
    this.refreshPlugin();
    this.RenderChart();
  }

  onSelectedMonthPluginLog(date: Date) {

    this._data = new Array<any>();
    this._count = new Array<any>();
    this._selectedMonthPlugingLog = date.getMonth() + 1;
    this._selectedYearPluginLog = date.getFullYear();
    this.refreshPluginLog();
  }

  refreshPluginLog() {

    this._pluginLogService.getSelectedYear(this._pluginId, this._selectedYearPluginLog)
      .subscribe((data: PluginLog[]) => {

        this._pluginLogCol = data;
        this.refreshChart();

      })
  }

  refreshPlugin() {
    this._pluginService.getAll()
      .subscribe((data: Plugin[]) => {

        this._pluginsCol = data;
        this._pluginId = this._pluginsCol[0].pluginId;
        this.refreshPluginLog();

      });
  }

  refreshChart() {
    const data = this.groupDatesByMonths();
    this._count = Object.values(data);

    if (this._chart) {
      this._chart.clear();
      this._chart.config.data.datasets[0].data = this._count;
      this._chart.update();
    }
  }

  RenderChart() {

    this._chart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: MONTHS,
        datasets: [{
          label: 'Utlized',
          data: this._count,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 342, 64, 0.2)',
            'rgba(255, 235, 64, 0.2)',
            'rgba(255, 555, 64, 0.2)',
            'rgba(255, 777, 64, 0.2)',
            'rgba(255, 999, 64, 0.2)',
            'rgba(255, 444, 64, 0.2)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 342, 64, 0.2)',
            'rgba(255, 235, 64, 0.2)',
            'rgba(255, 555, 64, 0.2)',
            'rgba(255, 777, 64, 0.2)',
            'rgba(255, 999, 64, 0.2)',
            'rgba(255, 444, 64, 0.2)',
          ],
          borderWidth: 3,
          borderSkipped: false,
          borderRadius: 10,
          barPercentage: 1,
          hoverBorderColor: "#000",
        }]
      },
      options: {
        // indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: false,
              text: 'Count',
            },
            ticks: {
              precision: 0 // Ensure integers are displayed without decimal points
            },
            grid: {
              display: false
            }
          },
          x: {
            title: {
              display: false,
              text: 'Month'
            },

          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {

          },
        }

      },
      plugins: [this.assignedTasks]
    });

  }

  ngOnChanges(changes: SimpleChanges): void {

    // if (changes) {
    //   const data = this.groupDatesByMonths();
    //   this._count = Object.values(data);

    //   if (this._chart) {
    //     this._chart.config.data.datasets[0].data = this._count;
    //     this._chart.update();
    //   }
    // }
  }

  todayLine = {
    id: 'todayLine',
    afterDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255, 26, 104, 1)';
      ctx.setLineDash([6, 6])
      ctx.moveTo(x.getPixelForValue(new Date()), top);
      ctx.lineTo(x.getPixelForValue(new Date()), bottom);
      ctx.stroke();
    }
  }

  assignedTasks = {
    id: 'assignedTasks',
    afterDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;
      ctx.font = 'bolder 14px sans-serif';
      ctx.fillStyle = 'black';
      ctx.textBaseline = 'middle';
      // console.log(ctx);
      // data.datasets[0].data.forEach((datapoint, index) => { ctx.fillText(datapoint.name, 10, y.getPixelForValue(index));})

      // @* data.designation.forEach((data, index) => {
      //   ctx.fillText(`(${data.split('')[0]})`, 10, y.getPixelForValue(index));
      // });* @

      //   @* data.label.forEach((data, index) => {
      //     ctx.fillText(data, 10, y.getPixelForValue(index));
      //   });* @
    }
  }

  groupDatesByMonths() {

    
    const groupedDates: { [key: string]: number } = {};

    for (let month = 1; month <= 12; month++) {
      groupedDates[`2024-${month.toString().padStart(2, '0')}`] = 0;
    }
    this._pluginLogCol.forEach(e => {

      const date = new Date(e.createdDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const key = `${year}-${month.toString().padStart(2, '0')}`
      // if (!groupedDates[key]) {
      //   groupedDates[key] = 0;
      // }

      groupedDates[key]++;
    });

    return groupedDates;
  }
}

