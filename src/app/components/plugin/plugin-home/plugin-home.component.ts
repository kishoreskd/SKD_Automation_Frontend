import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog';
import { PluginUpsertComponent } from '../plugin-upsert/plugin-upsert.component';
import { Plugin } from '../../../domain/model/plugin.model';
import { PluginService } from '../../../application/services/plugin-services/plugin-base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../../../application/services/common-services/alertify.service';
import { PluginKeyComponent } from '../plugin-key/plugin-key.component';


@Component({
  selector: 'app-plugin-home',
  templateUrl: './plugin-home.component.html',
  styleUrls: ['./plugin-home.component.css'],
})
export class PluginHomeComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;

  pluginCol: Array<Plugin> = new Array<Plugin>();
  displayedColumns: string[] = ['index', 'pluginName', 'manualMinutes', 'automatedMinutes', 'description', 'createdBy', 'createdDate', "action"];
  dataSource: MatTableDataSource<Plugin>;
  filterText: string;
  filterType: string;
  filterSource: Array<any> = [
    { key: "pluginName", val: "Plugin Name" },
    { key: "description", val: "Description" },
    { key: "createdBy", val: "Created By" }
  ];

  constructor(
    private _matDialog: MatDialog,
    private _service: PluginService,
    private _router: Router,
    private _activetedRoute: ActivatedRoute,
    private _alertify: AlertifyService,
    private readonly changeDetectorRef: ChangeDetectorRef) {

    // this.displayedColumns = ['pluginId', 'index', 'pluginName', 'manualMinutes', 'automatedMinutes', 'description', 'departmentName', 'createdBy', 'createdDate', "action"];
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    this.refreshPlugins();
    this.filterType = this.displayedColumns[1];
  }

  public onOpenPluginAddDialog() {
    const dialogRef = this._matDialog.open(PluginUpsertComponent, {});

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.refreshPlugins();
        }
      }
    })
  }

  public onEditPluginDialog(data: Plugin) {
    const dialogRef = this._matDialog.open(PluginUpsertComponent, { data });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.refreshPlugins();
        }
      }
    })
  }

  public onRemovePlugin(id: number) {
    // const isConfirm = this._alertify.alertQA("Are you sure want to remove the selected?")
    // if (!isConfirm) return;

    this._alertify.confirm("Are you sure want to remove?", () => {
      this._service.remove(id).subscribe(data => {
        this._alertify.success("Plugin has been removed!");
        this.refreshPlugins();
      });
    })
  }

  private refreshPlugins() {
    this._service.getByDepartment().subscribe((data: Plugin[]) => {
      this.pluginCol = data;
      this.dataSource = new MatTableDataSource<Plugin>(this.pluginCol);
      this.dataSource.paginator = this._paginator;
      this.dataSource.sort = this._sort;
    })
  }

  //Resolver
  private getAllPlugins() {
    this._activetedRoute.data.subscribe((data: Plugin[]) => {
      this.pluginCol = data['pluginCol'];
      this.dataSource = new MatTableDataSource<Plugin>(this.pluginCol);
    })
  }

  public onNavigatePluginLog(id: number) {
    this._router.navigate(['/plugin-log', id])
  }

  public onNavigatePluginLogChart(id: number) {
    this._router.navigate(['/plugin-log-chart', id])
  }

  public applyFilter() {

    const filterValue = this.filterText.toLowerCase();

    this.dataSource.filterPredicate = (data: Plugin, filter: string) => {

      if (Object.hasOwn(data, this.filterType)) {
        const columnValue = data[this.filterType].toString().toLowerCase();
        return columnValue.includes(filter);
      }
      else return true;
    }

    this.dataSource.filter = filterValue;
    if (this.dataSource._pageData) this.dataSource.paginator.firstPage();
  }

  onOpenKeyGenerator(data: Plugin) {
    const ref = this._matDialog.open(PluginKeyComponent, { width: "30%", data });
  }
}
