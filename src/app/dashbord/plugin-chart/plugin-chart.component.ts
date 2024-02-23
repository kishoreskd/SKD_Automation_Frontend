import { Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, input } from '@angular/core';
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
export class PluginChartComponent implements OnInit, OnDestroy  {

  @Input() pluginCol: Array<Plugin>;

  chart: any;
  canvasId: string;
  labelChart: Array<string> = new Array<string>();
  dataChart: Array<number> = new Array<number>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.canvasId = 'canvas-' + Math.random().toString(36).substring(7);
    this.RenderChart(this.canvasId);
    this.refreshChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.pluginCol);

    if (this.chart) {
      this.chart.clear();
      this.refreshChart();
    }
  }

 

  refreshChart() {

    this.groupedData();

    if (this.chart) {
      this.chart.config.data.labels = this.labelChart;
      this.chart.config.data.datasets[0].data = this.dataChart;
      this.chart.update();
    }
  }

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
  }

  RenderChart(id: string) {

    this.chart = new Chart(this.elementRef.nativeElement.querySelector('canvas'), {
      type: 'line',
      data: {
        labels: this.labelChart,
        datasets: [{
          label: 'Utilized',
          data: this.dataChart,
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

  ngOnDestroy() {
    // console.log("Destoryed!");
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
