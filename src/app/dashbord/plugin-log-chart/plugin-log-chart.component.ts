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

  @Input() pluginLogCol: Array<PluginLog> = new Array<PluginLog>;
  chart: Chart;
  dataSet: Array<any> = new Array<any>();
  countSet: Array<any> = new Array<any>();

  constructor() { }

  ngOnInit() {
    this.RenderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.refreshChart();
    }
  }

  refreshChart() {
    const data = this.groupDatesByMonths();
    this.countSet = Object.values(data);

    if (this.chart) {
      this.chart.clear();
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
          label: 'Utlized',
          data: this.countSet,
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
    });
  }


  groupDatesByMonths() {

    const groupedDates: { [key: string]: number } = {};
    for (let month = 1; month <= 12; month++) {
      groupedDates[`2024-${month.toString().padStart(2, '0')}`] = 0;
    }

    this.pluginLogCol.forEach(e => {

      const date = new Date(e.createdDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const key = `${year}-${month.toString().padStart(2, '0')}`
      groupedDates[key]++;
    });
    return groupedDates;
  }
}

