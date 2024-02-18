import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog';
import { PluginUpsertComponent } from '../plugin-upsert/plugin-upsert.component';
import { Plugin } from '../../domain/model/plugin.model';
import { PluginService } from '../../services/plugin-services/plugin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plugin-home',
  templateUrl: './plugin-home.component.html',
  styleUrls: ['./plugin-home.component.css']
})
export class PluginHomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;

  _pluginCol: Array<Plugin>;
  _displayedColumns: string[];
  _dataSource: MatTableDataSource<Plugin>;

  constructor(private _matDialog: MatDialog,
    private _service: PluginService,
    private _router: Router,
    private _activetedRoute: ActivatedRoute) {
    this._displayedColumns = ['pluginId', 'pluginName', 'manualMinutes', 'automatedMinutes', 'description', 'departmentName', "action"];
    this._pluginCol = new Array<Plugin>();
  }

  ngOnInit() {
    this.getAllPlugins();
  }

  ngAfterViewInit(): void {
    // Initializepaginator and sort after the view has been initialized
    this._dataSource.paginator = this._paginator;
    this._dataSource.sort = this._sort;
  }

  public onOpenPrjAddDialog() {
    const dialogRef = this._matDialog.open(PluginUpsertComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.refreshPlugins();
        }
      }
    })
  }

  public onEditPrjDialog(data: Plugin) {
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
    alert("Are u sure want to remove?");
    this._service.remove(id).subscribe({
      next: (val) => {
        console.log("Removed successfully!");
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

  private getAllPlugins() {
    this._activetedRoute.data.subscribe((data: Plugin[]) => {
      this._pluginCol = data['pluginCol'];
      this._dataSource = new MatTableDataSource<Plugin>(this._pluginCol);
    })
  }

  public onNavigatePluginLog(id: number) {
    console.log(id);
    this._router.navigate(['/plugin-log', id])
  }

}
