import { Component, ElementRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { Plugin } from '../../../../domain/model/plugin.model';

@Component({
  selector: 'app-plugin-pie-chart',
  templateUrl: './plugin-pie-chart.component.html',
  styleUrls: ['./plugin-pie-chart.component.css']
})
export class PluginPieChartComponent implements OnInit {

  @Input() pluginCol: Array<Plugin>;

  chart: any;
  canvasId: string;
  labelChart: Array<string> = new Array<string>();
  dataChart: Array<number> = new Array<number>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.canvasId = "plugin-pie-chart";
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
      type: 'pie',
      data: {
        labels: this.labelChart,
        datasets: [{
          label: 'Utilized',
          data: this.dataChart,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 342, 64, 1)',
            'rgba(255, 235, 64, 0.2)',
            'rgba(255, 555, 64, 0.2)',
            'rgba(255, 777, 64, 0.2)',
            'rgba(255, 999, 64, 0.2)',
            'rgba(255, 444, 64, 0.2)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 2)',
            'rgba(54, 162, 235, 2)',
            'rgba(255, 206, 86, 2)',
            'rgba(75, 192, 192, 2)',
            'rgba(153, 102, 255, 2)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 342, 64, 0.2)',
            'rgba(255, 235, 64, 0.2)',
            'rgba(255, 555, 64, 0.2)',
            'rgba(255, 777, 64, 0.2)',
            'rgba(255, 999, 64, 0.2)',
            'rgba(255, 444, 64, 0.2)',
          ],
          borderWidth: 1,
          hoverBorderColor: "#000",
        }]
      },
      options: {
        // indexAxis: 'y',
        scales: {
         
        
        },
        plugins: {
          legend: {
            display: true
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
