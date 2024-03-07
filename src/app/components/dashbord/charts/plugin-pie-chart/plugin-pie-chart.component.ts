import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
// import { Chart } from 'chart.js';
import { Plugin } from '../../../../domain/model/plugin.model';
import 'chart.js-plugin-labels-dv';

import Chart from 'chart.js/auto';
// import Chart from 'chart.js/auto';
import { getChartLabelPlugin, PLUGIN_ID } from 'chart.js-plugin-labels-dv';

@Component({
  selector: 'app-plugin-pie-chart',
  templateUrl: './plugin-pie-chart.component.html',
  styleUrls: ['./plugin-pie-chart.component.css']
})
export class PluginPieChartComponent implements OnInit {

  @Input() pluginCol: Array<Plugin>;

  // chart: any;
  canvasId: string;
  labelChart: Array<string> = new Array<string>();
  dataChart: Array<number> = new Array<number>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  //#region legacy
  // ngOnInit() {
  //   // this.canvasId = "plugin-pie-chart";
  //   // this.RenderChart(this.canvasId);
  //   // this.refreshChart();
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   // console.log(this.pluginCol);

  //   // if (this.chart) {
  //   //   this.chart.clear();
  //   //   this.refreshChart();
  //   // }
  // }



  // refreshChart() {

  //   this.groupedData();

  //   if (this.chart) {
  //     this.chart.config.data.labels = this.labelChart;
  //     this.chart.config.data.datasets[0].data = this.dataChart;
  //     this.chart.update();
  //   }
  // }

  // groupedData() {

  //   this.labelChart = new Array<string>();
  //   this.dataChart = new Array<number>();

  //   this.pluginCol.forEach(e => {

  //     this.labelChart.push(e.pluginName);

  //     if (e.pluginLogs !== null && e.pluginLogs.length > 0) {
  //       this.dataChart.push(e.pluginLogs.length);
  //     }
  //     else {
  //       this.dataChart.push(0);
  //     }
  //   });
  // }



  // RenderChart(id: string) {

  //   this.chart = new Chart(this.elementRef.nativeElement.querySelector('canvas'), {
  //     type: 'pie',
  //     data: {
  //       labels: this.labelChart,
  //       datasets: [{
  //         label: 'Utilized',
  //         data: this.dataChart,
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)',
  //           'rgba(255, 342, 64, 1)',
  //           'rgba(255, 235, 64, 0.2)',
  //           'rgba(255, 555, 64, 0.2)',
  //           'rgba(255, 777, 64, 0.2)',
  //           'rgba(255, 999, 64, 0.2)',
  //           'rgba(255, 444, 64, 0.2)',

  //         ],
  //         borderColor: [
  //           'rgba(255, 99, 132, 2)',
  //           'rgba(54, 162, 235, 2)',
  //           'rgba(255, 206, 86, 2)',
  //           'rgba(75, 192, 192, 2)',
  //           'rgba(153, 102, 255, 2)',
  //           'rgba(255, 159, 64, 1)',
  //           'rgba(255, 342, 64, 0.2)',
  //           'rgba(255, 235, 64, 0.2)',
  //           'rgba(255, 555, 64, 0.2)',
  //           'rgba(255, 777, 64, 0.2)',
  //           'rgba(255, 999, 64, 0.2)',
  //           'rgba(255, 444, 64, 0.2)',
  //         ],
  //         borderWidth: 1,
  //         hoverBorderColor: "#000",
  //       }]
  //     },
  //     options: {
  //       // indexAxis: 'y',
  //       scales: {


  //       },
  //       plugins: {

  //         legend: {
  //           display: true
  //         },
  //         tooltip: {

  //         },
  //       }
  //     },
  //   });

  //   // this.chart.registry?.plugns.get(PLUGIN_ID);
  // }

  // pieConfig = {
  //   options: {
  //     plugins: {
  //       legend: {
  //         position: 'top',
  //       },
  //       title: {
  //         display: true,
  //         text: 'Chart.js Pie Chart',
  //       },
  //       labels: {
  //         render: (args: any): string => {
  //           return args.value > 1 ? `${args.value}%` : '';
  //         },
  //         fontColor: '#000',
  //         fontStyle: 'bold',
  //         fontSize: 12,
  //         position: 'border',
  //       },
  //     },
  //   },
  // };



  //#endregion

  groupedData() {

    this.labelChart = new Array<string>();
    this.dataChart = new Array<number>();

    this.pluginCol.forEach(e => {

      this.labelChart.push(e.pluginName);
      if (e.pluginLogs !== null && e.pluginLogs.length > 0) {
        this.dataChart.push(e.pluginLogs.length);
      }
      else {
        this.dataChart.push(0);
      }
    });

    this.calculatePercentage();
  }



  data = {
    labels: this.labelChart,
    datasets: [
      {
        label: 'Utilized %',
        data: this.dataChart,
        backgroundColor: [
          '#ff22eb',
          '#ff911f',
          '#ffcd56',
          '#4cc0c0',
          '#37a2eb',
        ],
      },
    ],
  };

  pieConfig: any = {
    type: 'pie',
    data: this.data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'right',

        },
        title: {
          display: false,
          text: 'Top 5 utlized Plugins',
        },
        labels: {
          render: (args: any): string => {
            return args.value > 1 ? `${args.value}%` : '';
          },
          fontColor: '#000',
          fontStyle: 'bold',
          fontSize: 12,
          position: 'border',
        },
      },
    },
  };

  private static instanceCount: number = 0;
  private chart?: Chart;
  public readonly name: string = `chart-${PluginPieChartComponent.instanceCount++}`;


  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(): void {

    if (!this.chart) {
      return;
    }

    this.chart.destroy();
    this.groupedData();

    this.data.labels = this.labelChart;
    this.data.datasets[0].data = this.dataChart;

    this.createChart();
  }

  private createChart(): void {

    if (!this.hasRegisteredPlugin()) {
      Chart.register(getChartLabelPlugin());
    }

    this.chart = new Chart("plugin-pie-chart", this.pieConfig);
  }

  private hasRegisteredPlugin(): boolean {
    // console.log('Chart.registry:', Chart.registry);
    return !!Chart.registry?.plugins.get(PLUGIN_ID);
  }

  calculatePercentage() {
    if (this.dataChart.length <= 0) return;

    const initialValue = 0;
    const total = this.dataChart.reduce((acc, val) => acc + val, initialValue);
    let remainPercent = 100;
    this.dataChart = this.dataChart.map((value) => {
      const percent = Math.round((value / total) * 100)
      remainPercent -= percent;
      return percent;
    });

    for (let i = 0; i < remainPercent; i++) {
      const index = this.dataChart.indexOf(Math.min(...this.dataChart));
      this.dataChart[index]++;
    }
  }
}
