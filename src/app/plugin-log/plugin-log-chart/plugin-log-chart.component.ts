import { Component, ContentChild, Input, OnInit, ViewChild, input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PluginLog } from '../../domain/model/plugin-log.model';
Chart.register(...registerables);

@Component({
  selector: 'app-plugin-log-chart',
  templateUrl: './plugin-log-chart.component.html',
  styleUrls: ['./plugin-log-chart.component.css']
})
export class PluginLogChartComponent implements OnInit {

  @Input() _pluginLogCol: PluginLog[];

  constructor() { }

  ngOnInit() {
    console.log(this._pluginLogCol);
    this.RenderChart();
  }

  RenderChart() {
    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            time: {
              unit: 'day',
            },
          }
        }
      }
    });
  }

  config = {
    options: {
      layout: {
        scales: {
          x: {
            position: 'top',
            type: 'time',
            time: {
              unit: 'day',
            },
            min: '',
            max: '',
          },
        }
      }
    }
  }

}

