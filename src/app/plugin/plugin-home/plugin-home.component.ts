import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog';
import { PluginUpsertComponent } from '../plugin-upsert/plugin-upsert.component';
import { Plugin } from '../../domain/model/plugin-log.model';
import { PluginService } from '../../services/plugin-services/plugin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plugin-home',
  templateUrl: './plugin-home.component.html',
  styleUrls: ['./plugin-home.component.css']
})
export class PluginHomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  _pluginCol: Array<Plugin>;
  displayedColumns: string[];
  dataSource: MatTableDataSource<Plugin>;

  constructor(private _matDialog: MatDialog,
    private _service: PluginService,
    private _router: Router,
    private _activetedRoute: ActivatedRoute) {
    this.displayedColumns = ['pluginId', 'pluginName', 'manualMinutes', 'automatedMinutes', 'description', 'departmentName', "action"];
    this._pluginCol = new Array<Plugin>();
  }

  ngOnInit() {
    this.getAllPlugins();
  }

  ngAfterViewInit(): void {
    // Initialize paginator and sort after the view has been initialized

  }

  onOpenPrjAddDialog() {
    const dialogRef = this._matDialog.open(PluginUpsertComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          console.log(val);
          console.log("Actived");
          this.refreshPlugins();
        }
      }
    })
  }

  onEditPrjDialog(data: Plugin) {
    this._matDialog.open(PluginUpsertComponent, { data })
  }

  public refreshPlugins() {
    this._service.getAll().subscribe((data: Plugin[]) => {
      this._pluginCol = data;
      this.dataSource = new MatTableDataSource<Plugin>(this._pluginCol);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public getAllPlugins() {
    console.log("Actived");
    // this._service.getAll().subscribe((data: Plugin[]) => {
    //   this.dataSource = new MatTableDataSource<Plugin>(data);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }, (error) => console.log(error));
    this._activetedRoute.data.subscribe((data: Plugin[]) => {
      this._pluginCol = data['pluginCol'];
      this.dataSource = new MatTableDataSource<Plugin>(this._pluginCol);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
