import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../services/common/alertify.service';
import { PluginLogService } from '../services/plugin-services/plugin-log.service';
import { PluginLog } from '../domain/model/plugin-log.model';
import { Plugin } from '../domain/model/plugin.model';
import { PluginService } from '../services/plugin-services/plugin.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit {

  _pluginId: number;
  _pluginsCol: Array<Plugin>;
  _selectedMonthPlugingLog: number;
  _selectedYearPluginLog: number;
  _pluginLogCol: Array<PluginLog>;

  constructor(
    private _pluginService: PluginService,
    private _pluginLogService: PluginLogService,
    private _activateRoute: ActivatedRoute,
    private _alertify: AlertifyService) {

    this._pluginsCol = new Array<Plugin>();
    this._pluginLogCol = new Array<PluginLog>();
  }

  ngOnInit(): void {
    const today = new Date();
    this._selectedMonthPlugingLog = today.getMonth() + 1;
    this._selectedYearPluginLog = today.getFullYear();

    this.refreshPlugin();
  }

  onPuginSelectionChange(event: any) {
    console.log(event.value);
    this._pluginId = event.value;
    this.loadPluginLogChart();
  }

  loadPluginLogChart() {
    if (this._pluginsCol && this._pluginsCol.length > 0) {
      this.refreshPluginLog();
    }
  }

  onSelectedMonthPluginLog(date: Date) {
    this._selectedMonthPlugingLog = date.getMonth() + 1;
    this._selectedYearPluginLog = date.getFullYear();
    this.refreshPluginLog();
  }

  refreshPluginLog() {

    this._pluginLogService.getSelectedYear(this._pluginId, this._selectedYearPluginLog)
      .subscribe((data: PluginLog[]) => {

        this._pluginLogCol = data;
      })
  }

  refreshPlugin() {
    this._pluginService.getAll()
      .subscribe((data: Plugin[]) => {
        this._pluginsCol = data;
        this._pluginId = this._pluginsCol[0].pluginId;
        this.loadPluginLogChart();
      });
  }
}
