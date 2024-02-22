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
import { PluginService } from '../../services/plugin-services/plugin-base.service';

@Component({
  selector: 'app-plugin-log-home',
  templateUrl: './plugin-log-home.component.html',
  styleUrls: ['./plugin-log-home.component.css']
})
export class PluginLogHomeComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;

  _plugin: Plugin;
  _pluginLogCol: Array<PluginLog>;
  _displayedColumns: string[];
  _dataSource: MatTableDataSource<PluginLog>;
  _filterSource: Array<any>;
  _filterText: string;
  _filterType: string;
  _pluginId: number;
  _manualMinutes: number = 0;
  _automatedMinutes: number = 0;

  _selectedMonth: number;
  _selectedYear: number;

  constructor(private _matDialog: MatDialog,
    private _service: PluginLogService,
    private _activateRoute: ActivatedRoute,
    private _alertify: AlertifyService,
    private _pluginService: PluginService) {
    // this._displayedColumns = ['pluginLogId', 'pluginId', 'jobName', 'activity', 'createdBy', 'createdDate', 'action'];
    this._displayedColumns = ['index', 'jobName', 'activity', 'createdBy', 'createdDate', 'action'];

    this._filterSource = [
      { key: "jobName", val: "Job Name" },
      { key: "activity", val: "Activity" },
      { key: "createdBy", val: "Created By" },
    ];
    this._pluginLogCol = new Array<PluginLog>();
  }

  ngOnInit() {

    const today = new Date();
    this._selectedMonth = today.getMonth() + 1;
    this._selectedYear = today.getFullYear();
    this._pluginId = +this._activateRoute.snapshot.params['id'];
    this.refreshPluginLog();

    this._filterType = this._displayedColumns[1];
  }

  ngAfterViewInit(): void {
    // this._dataSource.paginator = this._paginator;
    // this._dataSource.sort = this._sort;
  }

  onSelectedMonth(date: Date) {

    this._dataSource = null;
    this._selectedMonth = date.getMonth() + 1;
    this._selectedYear = date.getFullYear();

    this.refreshPluginLog();
  }

  public onOpenPrjAddDialog() {

    const data = new PluginLog();
    data.pluginLogId = 0;
    data.pluginId = this._pluginId;

    const dialogRef = this._matDialog.open(PluginLogUpsertComponent, { width: "30%", data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.refreshPluginLog();
        }
      }
    })
  }

  public onEditPrjDialog(data: PluginLog) {

    const dialogRef = this._matDialog.open(PluginLogUpsertComponent, { width: "30%", data })
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

    this._service.getByMonthYear(this._pluginId, this._selectedMonth, this._selectedYear)
      .subscribe((data: PluginLog[]) => {
        this._pluginLogCol = data;
        this._dataSource = new MatTableDataSource<PluginLog>(this._pluginLogCol);
        this._dataSource.paginator = this._paginator;
        this._dataSource.sort = this._sort;
        this.getPlugin();
      })
  }

  private getPlugin() {
    this._pluginService.getWithLog(this._pluginId).subscribe((data: Plugin) => {
      this._automatedMinutes = (data.automatedMinutes * this._pluginLogCol.length);
      this._manualMinutes = (data.manualMinutes * this._pluginLogCol.length);
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
