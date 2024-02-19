import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog';
import { PluginUpsertComponent } from '../plugin-upsert/plugin-upsert.component';
import { Plugin } from '../../domain/model/plugin.model';
import { PluginService } from '../../services/plugin-services/plugin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../../services/common/alertify.service';

@Component({
  selector: 'app-plugin-home',
  templateUrl: './plugin-home.component.html',
  styleUrls: ['./plugin-home.component.css'],
})
export class PluginHomeComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;

  _pluginCol: Array<Plugin>;
  _displayedColumns: string[];
  _dataSource: MatTableDataSource<Plugin>;
  _filterSource: Array<any>;
  _filterText: string;
  _filterType: string;

  constructor(
    private _matDialog: MatDialog,
    private _service: PluginService,
    private _router: Router,
    private _activetedRoute: ActivatedRoute,
    private _alertify: AlertifyService,
    private readonly changeDetectorRef: ChangeDetectorRef) {

    this._displayedColumns = ['pluginId', 'index', 'pluginName', 'manualMinutes', 'automatedMinutes', 'description', 'departmentName', 'createdBy', 'createdDate', "action"];
    this._filterSource = [
      { key: "pluginName", val: "Plugin Name" },
      { key: "description", val: "Description" },
      { key: "departmentName", val: "Department Name" },
      { key: "createdEmployeeId", val: "Created By" }
    ];
    this._pluginCol = new Array<Plugin>();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    this.refreshPlugins();
    this._filterType = this._displayedColumns[2];
  }

  ngAfterViewInit(): void {
    // Initializepaginator and sort after the view has been initialized
    this._dataSource.paginator = this._paginator;
    this._dataSource.sort = this._sort;
  }

  public onOpenPluginAddDialog() {
    const dialogRef = this._matDialog.open(PluginUpsertComponent, { width: "50%" });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.refreshPlugins();
        }
      }
    })
  }

  public onEditPluginDialog(data: Plugin) {
    const dialogRef = this._matDialog.open(PluginUpsertComponent, { width: "50%", data })
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.refreshPlugins();
        }
      }
    })
  }

  public onRemovePlugin(id: number) {
    const isConfirm = this._alertify.alertQA("Are you sure want to remove the selected?")
    if (!isConfirm) return;

    this._service.remove(id).subscribe({
      next: (val) => {
        this._alertify.alert("Plugin has been removed!");
        this.refreshPlugins();
      }
    });

  }

  private refreshPlugins() {
    this._service.getAll().subscribe((data: Plugin[]) => {
      this._pluginCol = data;
      this._dataSource = new MatTableDataSource<Plugin>(this._pluginCol);
      this._dataSource.paginator = this._paginator;
      this._dataSource.sort = this._sort;
    })
  }

  //Resolver
  private getAllPlugins() {
    this._activetedRoute.data.subscribe((data: Plugin[]) => {
      this._pluginCol = data['pluginCol'];
      this._dataSource = new MatTableDataSource<Plugin>(this._pluginCol);
    })
  }

  public onNavigatePluginLog(id: number) {
    this._router.navigate(['/plugin-log', id])
  }

  public onNavigatePluginLogChart(id: number) {
    this._router.navigate(['/plugin-log-chart', id])
  }

  public applyFilter() {

    const filterValue = this._filterText.toLowerCase();

    this._dataSource.filterPredicate = (data: Plugin, filter: string) => {

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
