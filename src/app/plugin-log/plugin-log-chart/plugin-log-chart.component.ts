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
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const data = this.groupDatesByMonths();
    // const months = Object.keys(data);
    const count = Object.values(data);

    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: '# of Votes',
          data: count,
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
        // indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: false,
              text: 'Count'
            }
          },
          x: {
            title: {
              display: false,
              text: 'Month'
            }
          }
        },
        plugins: {
          legend: {
            display: true
          },
          tooltip: {

          },
        }
      },
      plugins: [this.todayLine, this.assignedTasks]
    });

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
      ctx.font = 'bolder 12px sans-serif';
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

