import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours'
})
export class MinutesToHoursPipe implements PipeTransform {

  transform(value: number): string {
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
}
