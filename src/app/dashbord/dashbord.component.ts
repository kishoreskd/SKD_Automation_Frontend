import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../services/common/alertify.service';
import { PluginLogService } from '../services/plugin-services/plugin-log.service';
import { PluginLog } from '../domain/model/plugin-log.model';
import { Plugin } from '../domain/model/plugin.model';
import { PluginService } from '../services/plugin-services/plugin-base.service';
import { DashbordService } from '../services/plugin-services/dashbord.service';
import { Dashbord } from '../domain/model/dashbord';
import { DepartmentService } from '../services/department/department.service';
import { Department } from '../domain/model/department';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit {


  pId: number;
  selectedMonth: number;
  selectedYear: number;

  pluginName: string;

  pluginChartData: Plugin[] = new Array<Plugin>();
  productivityChartData: Plugin = new Plugin();
  pluginLogChartData: Plugin = new Plugin();

  pluginSelections: Plugin[] = new Array<Plugin>();

  totalPCount: number = 0;
  totalMminute: number = 0;
  totalAminute: number = 0;

  month

  constructor(
    private readonly _pluginService: PluginService,
    private readonly _logService: PluginLogService,
    private readonly _dashbordService: DashbordService,
    private readonly _depService: DepartmentService) {
  }

  ngOnInit(): void {

    this.loadPluginSelections();
    this.setDefault();
    this.getCounterCardData();
  }

  setDefault() {
    const today = new Date();
    this.selectedMonth = today.getMonth() + 1;
    this.selectedYear = today.getFullYear();
  }

  resetChartData() {
  }

  onSelectedMonth(date: Date) {

    this.productivityChartData = new Plugin();
    this.pluginLogChartData = new Plugin();

    // console.log(this.pluginChartData);

    this.selectedMonth = date.getMonth() + 1;
    this.selectedYear = date.getFullYear();

    if (this.pId > 0) {
      this.getPluginChartData();
      this.getProductivityChartData();
      this.getPluginLogChartData();
    }
  }

  onPluginSelectionChange(event: any) {

    console.log("Triggered");
    if (this.pId > 0) {

      this.resetChartData();
      this.getProductivityChartData();
      this.getPluginLogChartData();
    }
  }

  loadPluginSelections() {
    this._pluginService.getByDepartment().subscribe((data: Plugin[]) => {
      this.pluginSelections = data;
      this.pId = data[0].pluginId;

      this.getPluginChartData();
      this.getProductivityChartData();
      this.getPluginLogChartData();
    })
  }

  getProductivityChartData() {
    this._pluginService.getWithLogByMonthAndYear(this.pId, this.selectedMonth, this.selectedYear).subscribe((data: Plugin) => {
      this.productivityChartData = data;
    });
  }

  getPluginChartData() {
    this._pluginService.getAllWithLogByMonthAndYear(this.selectedMonth, this.selectedYear).subscribe((data: Plugin[]) => {
      this.pluginChartData = data;
    });
  }

  getPluginLogChartData() {
    this._pluginService.getWithLogByYear(this.pId, this.selectedYear).subscribe((data: Plugin) => {
      this.pluginLogChartData = data;
      this.pluginName = data.pluginName;
    }, error => {
      console.log(error);
    })
  }


  getCounterCardData() {
    this._dashbordService.getAll().subscribe((data: Dashbord) => {
      this.totalPCount = data.totalPlugins;
      this.totalMminute = data.totalManualMiniutes;
      this.totalAminute = data.totalAutomatedMinutes;
    })
  }

  getCounterCardDataByMonthYear() {
    this._dashbordService.getAll().subscribe((data: Dashbord) => {

    })
  }

}
