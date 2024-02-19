import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PluginLog } from '../../domain/model/plugin-log.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PluginLogService } from '../../services/plugin-services/plugin-log.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { AlertifyService } from '../../services/common/alertify.service';
import { PluginLogUpsertComponent } from '../plugin-log-upsert/plugin-log-upsert.component';
import { Plugin } from '../../domain/model/plugin.model';

@Component({
  selector: 'app-plugin-log-home',
  templateUrl: './plugin-log-home.component.html',
  styleUrls: ['./plugin-log-home.component.css']
})
export class PluginLogHomeComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;

  _pluginLogCol: Array<PluginLog>;
  _displayedColumns: string[];
  _dataSource: MatTableDataSource<PluginLog>;
  _filterSource: Array<any>;
  _filterText: string;
  _filterType: string;
  _pluginId: number;

  constructor(private _matDialog: MatDialog,
    private _service: PluginLogService,
    private _activateRoute: ActivatedRoute,
    private _alertify: AlertifyService) {
    this._displayedColumns = ['pluginLogId', 'pluginId', 'jobName', 'activity', 'createdBy', 'createdDate', 'action'];
    this._filterSource = [
      { key: "jobName", val: "Job Name" },
      { key: "activity", val: "Activity" },
      { key: "createdBy", val: "Created By" },
    ];
    this._pluginLogCol = new Array<PluginLog>();
  }

  ngOnInit() {
    this._pluginId = +this._activateRoute.snapshot.params['id'];
    this.refreshPluginLog();
  }

  ngAfterViewInit(): void {
    this._dataSource.paginator = this._paginator;
    this._dataSource.sort = this._sort;
  }


  public onOpenPrjAddDialog() {

    const data = new PluginLog();
    data.pluginLogId = 0;
    data.pluginId = this._pluginId;

    const dialogRef = this._matDialog.open(PluginLogUpsertComponent, { width: "50%", data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.refreshPluginLog();
        }
      }
    })
  }

  public onEditPrjDialog(data: PluginLog) {

    const dialogRef = this._matDialog.open(PluginLogUpsertComponent, { width: "50%", data })
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.refreshPluginLog();
        }
      }
    })
  }

  public onRemovePrjLog(id: number) {
    const isConfirm = this._alertify.alertQA("Are you sure want to remove the selected?")
    if (!isConfirm) return;

    this._service.remove(id).subscribe({
      next: (val) => {
        this._alertify.alert("Plugin has been removed!");
        this.refreshPluginLog();
      }
    });

  }

  private refreshPluginLog() {

    this._service.getSelected(this._pluginId).subscribe((data: PluginLog[]) => {
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

  public applyFilter() {

    const filterValue = this._filterText.toLowerCase();

    this._dataSource.filterPredicate = (data: PluginLog, filter: string) => {

      if (Object.hasOwn(data, this._filterType)) {
        const columnValue = data[this._filterType].toLowerCase();
        return columnValue.includes(filter);
      }
      else return true;
    }

    this._dataSource.filter = filterValue;

    if (this._dataSource._pageData) this._dataSource.paginator.firstPage();
  }
}
