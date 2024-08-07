import { Component, ContentChild, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PluginLog } from '../../../../domain/model/plugin-log.model';
import { PluginLogService } from '../../../../application/services/plugin-services/plugin-log.service';
import { Plugin } from '../../../../domain/model/plugin.model';
import { PluginService } from '../../../../application/services/plugin-services/plugin-base.service';
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
export class PluginLogChartComponent implements OnInit, OnChanges, OnDestroy {

  @Input() plugin: Plugin;

  chart: Chart;
  dataSet: Array<any> = new Array<any>();
  countSet: Array<any> = new Array<any>();

  constructor() { }

  ngOnInit() {
    this.RenderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.chart.clear();
      this.refreshChart();
    }
  }

  refreshChart() {
    const data = this.getChartData();
    this.countSet = Object.values(data);

    if (this.chart) {
      this.chart.config.data.datasets[0].data = this.countSet;
      this.chart.update();
    }
  }

  RenderChart() {

    this.chart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: MONTHS,
        datasets: [{
          label: 'Utilized',
          data: this.countSet,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 342, 64, 1)',
            'rgba(255, 235, 64, 1)',
            'rgba(255, 555, 64, 1)',
            'rgba(255, 777, 64, 1)',
            'rgba(255, 999, 64, 1)',
            'rgba(255, 444, 64, 1)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255,1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 342, 64, 1)',
            'rgba(255, 235, 64, 1)',
            'rgba(255, 555, 64, 1)',
            'rgba(255, 777, 64, 1)',
            'rgba(255, 999, 64, 1)',
            'rgba(255, 444, 64, 1)',
          ],
          borderWidth: 1,
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
    });
  }


  getChartData() {


    const groupedDates: { [key: string]: number } = {};
    for (let month = 1; month <= 12; month++) {
      groupedDates[`2024-${month.toString().padStart(2, '0')}`] = 0;
    }


    this.plugin.pluginLogs?.forEach(e => {

      const date = new Date(e.createdDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const key = `${year}-${month.toString().padStart(2, '0')}`
      groupedDates[key]++;
    });

    return groupedDates;
  }

  ngOnDestroy() {
    // console.log("Destoryed!");
    if (this.chart) {
      this.chart.destroy();
    }
  }
}

