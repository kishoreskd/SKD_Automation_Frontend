import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PluginLog } from '../../domain/model/plugin-log.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PluginLogService } from '../../application/services/plugin-services/plugin-log.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { AlertifyService } from '../../application/services/common-services/alertify.service';
import { PluginLogUpsertComponent } from '../plugin-log-upsert/plugin-log-upsert.component';
import { Plugin } from '../../domain/model/plugin.model';
import { PluginService } from '../../application/services/plugin-services/plugin-base.service';
import { PluginKeyComponent } from '../../components/plugin-key/plugin-key.component';

@Component({
  selector: 'app-plugin-log-home',
  templateUrl: './plugin-log-home.component.html',
  styleUrls: ['./plugin-log-home.component.css']
})
export class PluginLogHomeComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;


  _FILTERSOURCE: Array<any> = [
    { key: "jobName", val: "Job Name" },
    { key: "activity", val: "Activity" },
    { key: "createdBy", val: "Created By" },
  ];

  _DISPLAYED_COLUMNS: string[] = ['index', 'jobName', 'activity', 'createdBy', 'createdDate', 'action'];
  _PICKER_FILTERSOURCE: Array<any> = [
    { key: "day", val: "Day" },
    { key: "month", val: "Month" }
  ]

  selectedDate: Date = new Date();;
  pickerSelection: string;
  plugin: Plugin;
  plugins: Array<PluginLog> = new Array<PluginLog>();;
  dataSource: MatTableDataSource<PluginLog>;
  filterText: string;
  filterType: string;
  pluginId: number;
  pluginName: string;
  manualMinutes: number = 0;
  automatedMinutes: number = 0;

  constructor(private _matDialog: MatDialog,
    private _service: PluginLogService,
    private _activateRoute: ActivatedRoute,
    private _alertify: AlertifyService,
    private _pluginService: PluginService,
    private _router: Router) {
  }

  ngOnInit() {

    this.pluginId = +this._activateRoute.snapshot.params['id'];
    this.refreshPluginLog();

    this.filterType = this._DISPLAYED_COLUMNS[1];
    this.pickerSelection = this._PICKER_FILTERSOURCE[0].key;
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this._paginator;
    // this.dataSource.sort = this._sort;
  }

  onSelectedMonth(date: Date) {

    this.selectedDate = date;
    this.refreshPluginLog();
  }

  onSelectedDay(date: Date) {
    this.selectedDate = date;
    this.refreshPluginLog();
  }

  public onOpenPrjAddDialog() {
    const data = new PluginLog();
    data.pluginLogId = 0;
    data.pluginId = this.pluginId;

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

    const isConfirm = this._alertify.confirm("Are you sure want to remove ?", () => {
      this._service.remove(id).subscribe(data => {
        this.refreshPluginLog();
        this._alertify.success("Log has been removed!");
      });
    })
  }

  private refreshPluginLog() {

    if (this.pickerSelection === "month") {
      // console.log("Month");
      this._pluginService.getWithLogByMonthAndYear(this.pluginId, this.selectedDate).subscribe((data) => {
        this.loadDataSource(data);
      })
    } else {
      // console.log("Day");
      this._pluginService.getWithLogByDay(this.pluginId, this.selectedDate).subscribe((data) => {
        this.loadDataSource(data);
      })
    }
  }

  private loadDataSource(data: Plugin) {
    this.dataSource = null;
    this.automatedMinutes = (data.automatedMinutes * data.pluginLogs?.length);
    this.manualMinutes = (data.manualMinutes * data.pluginLogs?.length);
    this.plugins = data.pluginLogs;
    this.dataSource = new MatTableDataSource<PluginLog>(this.plugins);
    this.dataSource.paginator = this._paginator;
    this.dataSource.sort = this._sort;
    this.pluginName = data.pluginName;
  }

  public applyFilter() {

    const filterValue = this.filterText.toLowerCase();

    this.dataSource.filterPredicate = (data: PluginLog, filter: string) => {

      if (Object.hasOwn(data, this.filterType)) {
        const columnValue = data[this.filterType].toString().toLowerCase();
        return columnValue.includes(filter);
      }
      else return true;
    }

    this.dataSource.filter = filterValue;

    if (this.dataSource._pageData) this.dataSource.paginator.firstPage();
  }

  private getPlugin() {
    this._pluginService.getWithLog(this.pluginId).subscribe((data: Plugin) => {
      this.automatedMinutes = (data.automatedMinutes * this.plugins.length);
      this.manualMinutes = (data.manualMinutes * this.plugins.length);
    })
  }

  private getAllPluginLog() {
    this._activateRoute.data.subscribe((data) => {
      this.plugins = data['plugins'];
      this.dataSource = new MatTableDataSource<PluginLog>(this.plugins);
    })
  }

  public navigateToPluginHome() {
    this._router.navigate(['plugin/home']);
  }



}
