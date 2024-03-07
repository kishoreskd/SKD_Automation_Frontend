import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../../application/services/common-services/alertify.service';
import { PluginLogService } from '../../../application/services/plugin-services/plugin-log.service';
import { PluginLog } from '../../../domain/model/plugin-log.model';
import { Plugin } from '../../../domain/model/plugin.model';
import { PluginService } from '../../../application/services/plugin-services/plugin-base.service';
import { DashbordService } from '../../../application/services/plugin-services/dashbord.service';
import { Dashbord } from '../../../domain/model/dashbord.model';
import { DepartmentService } from '../../../application/services/admin-services/department.service';
import { Department } from '../../../domain/model/department.model';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit {


  pId: number;
  selectedMonth: number;
  selectedYear: number;
  selectedDate: Date = new Date();

  pluginName: string;

  pluginChartData: Plugin[] = new Array<Plugin>();
  productivityChartData: Plugin = new Plugin();
  pluginLogChartData: Plugin = new Plugin();
  pluginSelections: Plugin[] = new Array<Plugin>();
  topPlugins: Plugin[] = new Array<Plugin>();
  dashbordSelectedMonth: Dashbord = new Dashbord();

  totalPCount: number = 0;
  totalMminute: number = 0;
  totalAminute: number = 0;

  manualCardByMnth: number = 0;
  automateCardByMnth: number = 0;

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
    this.getTopPlugins();
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
    this.selectedDate = date;

    if (this.pId > 0) {
      this.getPluginChartData();
      this.getProductivityChartData();
      this.getPluginLogChartData();
      this.getCounterCardDataByMonthYear();
      this.getTopPlugins();

    }
  }

  onPluginSelectionChange(event: any) {

    if (this.pId > 0) {

      this.resetChartData();
      this.getProductivityChartData();
      this.getPluginLogChartData();
      this.getCounterCardDataByMonthYear();

    }
  }

  loadPluginSelections() {
    this._pluginService.getByDepartment().subscribe((data: Plugin[]) => {
      // console.log(data[0]);

      if (data.length > 0) {
        this.pluginSelections = data;
        this.pId = data[0].pluginId;

        this.getPluginChartData();
        this.getProductivityChartData();
        this.getPluginLogChartData();
        this.getCounterCardDataByMonthYear();


      }

    })
  }

  getProductivityChartData() {
    this._pluginService.getWithLogByMonthAndYear(this.pId, this.selectedDate).subscribe((data: Plugin) => {
      this.productivityChartData = data;
    });
  }

  getPluginChartData() {
    this._pluginService.getAllWithLogByMonthAndYear(this.selectedDate).subscribe((data: Plugin[]) => {
      this.pluginChartData = data;
    });
  }

  getPluginLogChartData() {
    this._pluginService.getWithLogByYear(this.pId, this.selectedDate).subscribe((data: Plugin) => {
      this.pluginLogChartData = data;
      this.pluginName = data.pluginName;
    });
  }


  getCounterCardData() {
    this._dashbordService.getAll().subscribe((data: Dashbord) => {
      this.totalPCount = data.totalPlugins;
      this.totalMminute = data.totalManualMiniutes;
      this.totalAminute = data.totalAutomatedMinutes;
    });
  }

  getCounterCardDataByMonthYear() {
    this._dashbordService.getByMonthYear(this.pId, this.selectedDate).subscribe((data: Dashbord) => {
      this.dashbordSelectedMonth = data;
      this.manualCardByMnth = data.totalManualMiniutes;
      this.automateCardByMnth = data.totalAutomatedMinutes;
    });
  }

  getTopPlugins() {
    this._pluginService.getTopPlugin(5, this.selectedDate).subscribe((e: Plugin[]) => {
      this.topPlugins = e;
      // console.log(this.topPlugins);
    });
  }

}
