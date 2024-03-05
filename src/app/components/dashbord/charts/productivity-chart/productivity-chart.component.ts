import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { Plugin } from '../../../../domain/model/plugin.model';
import 'chartjs-adapter-moment'
import { AnyObject } from 'chart.js/dist/types/basic';

@Component({
  selector: 'app-productivity-chart',
  templateUrl: './productivity-chart.component.html',
  styleUrls: ['./productivity-chart.component.css']
})
export class ProductivityChartComponent implements OnInit, OnChanges, OnDestroy {

  @Input() plgn: Plugin;
  chart: Chart;
  dataSet: Array<any> = new Array<any>();
  countSet: Array<any> = new Array<any>();

  labels: Array<string> = ['Before Automation', 'After Automation'];
  constructor() { }

  ngOnInit() {
    this.RenderChart();
    // this.refreshChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      // this.dataSet = new Array<any>();
      // this.countSet = new Array<any>();

      this.chart.clear();
      this.refreshChart();
    }
  }

  refreshChart() {

    const data = this.getChartData();
    this.countSet = data;

    if (this.chart) {
      this.chart.config.data.datasets[0].data = this.countSet;
      this.chart.update();
    }
  }

  RenderChart() {

    this.chart = new Chart("pChart", {

      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Taken ',
          data: this.countSet,
          backgroundColor: [
            'rgba(255, 99, 132,2)',
            'rgba(54, 162, 235,2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 2)',
            'rgba(54, 162, 235, 2)',
          ],
          borderWidth: 1,
          borderSkipped: false,
          borderRadius: 10,
          barPercentage: 1,
          hoverBorderColor: "#000",
        }]
      },
      options: {
        animation: {

        },
        scales: {
          y: {
            grid: {
              display: false
            },
            display: true,
            ticks: {
              callback: function (value, index, values) {
                const hours = Math.floor(+value / 60);
                const minutes = +value % 60;
                return hours + 'h:' + minutes + 'm';
              }
            }
          },
          x: {
            title: {
              display: false,
              // text: 'Month'
            },
          }
        },


        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: context => {
                return this.minToHours(+context.raw);
              }
            }
          },

        },

      },

    });
  } 

  getChartData() {
    const mMin = this.plgn.manualMinutes * this.plgn.pluginLogs?.length;
    const aMin = this.plgn.automatedMinutes * this.plgn.pluginLogs?.length;
    return [mMin, aMin]
  }

  minToHours(value: number): string {
    // if (value > 0 && value / 60 < 1) {
    //   return value + ' Minutes';
    // } else {
    //   return value / 60 + ' Hours'
    // }

    let hours = Math.floor(value / 60);
    // console.log("hours " + hours + " - " + (value / 60));
    let minutes = Math.floor(value % 60);
    // console.log("minutes " + minutes + " - " + (value % 60));


    return `${hours}h : ${minutes}m`
  }


  ngOnDestroy() {
    // console.log("Destoryed!");
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
