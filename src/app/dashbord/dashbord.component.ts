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

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit {

  pId: number = 1;
  month: number = 2;
  year: number = 2024;
  departmentId: number = 1;

  pCol: Plugin[] = new Array<Plugin>();
  pLogCol: PluginLog[] = new Array<PluginLog>();

  totalPCount: number = 0;
  totalMminute: number = 0;
  totalAminute: number = 0;

  constructor(
    private readonly _pService: PluginService,
    private readonly _pLogLogService: PluginLogService,
    private readonly _dService: DashbordService) {
  }

  ngOnInit(): void {
    this.getP();
    this.getPLog();
    this.getD();
  }


  getP() {
    this._pService.getWithLogByMonthAndYear(this.departmentId, this.month, this.year).subscribe((data: Plugin[]) => {
      this.pCol = data;

    });
  }

  getPLog() {
    this._pLogLogService.getByMonthYear(this.pId, this.month, this.year).subscribe((data: PluginLog[]) => {
      this.pLogCol = data;
    })
  }

  getD() {
    this._dService.getAll().subscribe((data: Dashbord) => {
      this.totalPCount = data.totalPlugins;
      this.totalMminute = data.totalManualMiniutes;
      this.totalAminute = data.totalAutomatedMinutes;
    })
  }

}
