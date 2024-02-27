import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  @Output() dateTimeSelected = new EventEmitter<Date>();
  date: FormControl = new FormControl(new Date());

  constructor() { }

  ngOnInit() {
  }

  OnClosed() {
    this.dateTimeSelected.emit(this.date.value);
  }
}
