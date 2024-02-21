import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../services/common/alertify.service';
import { PluginLogService } from '../services/plugin-services/plugin-log.service';
import { PluginLog } from '../domain/model/plugin-log.model';
import { Plugin } from '../domain/model/plugin.model';
import { PluginService } from '../services/plugin-services/plugin-base.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
