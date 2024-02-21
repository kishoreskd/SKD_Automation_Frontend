import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Plugin } from '../../domain/model/plugin.model';
import { PluginService } from '../../services/plugin-services/plugin-base.service';
import { ThisReceiver } from '@angular/compiler';
Chart.register(...registerables);


@Component({
  selector: 'app-plugin-chart',
  templateUrl: './plugin-chart.component.html',
  styleUrls: ['./plugin-chart.component.css']
})
export class PluginChartComponent implements OnInit {

  _chart: any;
  _labelChart: Array<string> = new Array<string>();
  _dataChart: Array<number> = new Array<number>();
  _pluginsCol: Array<Plugin>;
  _selectedMonth: number;
  _selectedYear: number;

  constructor(private _pluginService: PluginService) { }

  ngOnInit() {
    const today = new Date();
    this._selectedMonth = today.getMonth() + 1;
    this._selectedYear = today.getFullYear();
    this.refreshPlugin();
    this.RenderChart();
  }

  onSelectedMonthPluginLog(date: Date) {
    this._selectedMonth = date.getMonth() + 1;
    this._selectedYear = date.getFullYear();
    this.refreshPlugin();
  }

  refreshPlugin() {
    this._pluginService.getAllForYearWithLog(this._selectedYear)
      .subscribe((data: Plugin[]) => {
        this._pluginsCol = data;
        this.refreshChart();
      });
  }

  refreshChart() {

    this.groupedData();

    if (this._chart) {
      this._chart.config.data.labels = this._labelChart;
      this._chart.config.data.datasets[0].data = this._dataChart;
      this._chart.update();
    }
  }

  groupedData() {

    this._labelChart = new Array<string>();
    this._dataChart = new Array<number>();

    this._pluginsCol.forEach(e => {

      this._labelChart.push(e.pluginName);

      if (e.pluginLogs !== null && e.pluginLogs.length > 0) {
        this._dataChart.push(e.pluginLogs.length);
      }
      else {
        this._dataChart.push(0);
      }
    });

  }

  RenderChart() {

    this._chart = new Chart("plugin_chart", {
      type: 'line',
      data: {
        labels: this._labelChart,
        datasets: [{
          label: 'Utlized',
          data: this._dataChart,
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
              display: true
            }
          },
          x: {
            title: {
              display: false,
              text: 'Month'
            },
            grid: {
              display: true
            }
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
    });
  }

}
