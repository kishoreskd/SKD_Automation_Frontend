import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PluginLog } from '../../domain/model/plugin-log.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PluginLogService } from '../../services/plugin-services/plugin-log.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-plugin-log-home',
  templateUrl: './plugin-log-home.component.html',
  styleUrls: ['./plugin-log-home.component.css']
})
export class PluginLogHomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;

  _pluginLogCol: Array<PluginLog>;
  _displayedColumns: string[];
  _dataSource: MatTableDataSource<PluginLog>;

  constructor(private _matDialog: MatDialog,
    private _service: PluginLogService,
    private _activateRoute: ActivatedRoute) {
    this._displayedColumns = ['pluginLogId', 'pluginId', 'jobName', 'activity', 'createdBy', 'createdDate', 'action'];
    this._pluginLogCol = new Array<PluginLog>();
  }

  ngOnInit() {
    this.getAllPluginLog();
  }

  ngAfterViewInit(): void {
    this._dataSource.paginator = this._paginator;
    this._dataSource.sort = this._sort;
  }

  private refreshPluginLog() {
    this._service.getAll().subscribe((data: PluginLog[]) => {
      this._pluginLogCol = data;
      this._dataSource = new MatTableDataSource<PluginLog>(this._pluginLogCol);
      this._dataSource.paginator = this._paginator;
      this._dataSource.sort = this._sort;
    })
  }

  private getAllPluginLog() {
    this._activateRoute.data.subscribe((data) => {
      this._pluginLogCol = data['pluginLogCol'];
      this._dataSource = new MatTableDataSource<PluginLog>(this._pluginLogCol);
    })
  }
}
