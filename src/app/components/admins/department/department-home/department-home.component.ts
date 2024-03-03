import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Department } from '../../../../domain/model/department.model';
import { DepartmentService } from '../../../../application/services/admin-services/department.service';
import { AlertifyService } from '../../../../application/services/common-services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentUpsertComponent } from '../department-upsert/department-upsert.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-department-home',
  templateUrl: './department-home.component.html',
  styleUrls: ['./department-home.component.css']
})
export class DepartmentHomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  departments: Department[];
  displayedColumns: string[] = ['index', 'departmentName', 'action']

  dataSource: MatTableDataSource<Department>;
  filterType: string;
  filterText: string;
  filterSource: any[] = [
    { key: 'departmentName', value: "Department Name" }
  ]

  constructor(private readonly _departmentService: DepartmentService,
    private readonly _alertify: AlertifyService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.filterType = this.displayedColumns[1];
    this.getAll();
  }

  onOpenDlg() {
    const data = new Department();
    data.departmentId = 0;
    const ref = this._matDialog.open(DepartmentUpsertComponent, { width: "30%", data });
    ref.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAll();
        }
      }
    })
  }

  onEditDlg(data: Department) {
    const ref = this._matDialog.open(DepartmentUpsertComponent, { width: "30%", data });
    ref.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAll();
        }
      }
    })
  }

  onRemove(id: number) {
    const isConfirm = this._alertify.confirm("Are you sure want to remove ?", () => {
      this._departmentService.remove(id).subscribe(data => {
        this.getAll();
        this._alertify.success("Department has been removed!");
      });
    })
  }

  getAll() {
    this._departmentService.getAll().subscribe((data: Department[]) => {
      this.departments = data;
      this.dataSource = new MatTableDataSource<Department>(this.departments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter() {

    const filterValue = this.filterText.toLowerCase();

    this.dataSource.filterPredicate = (data: Department, filter: string) => {

      if (Object.hasOwn(data, this.filterType)) {
        const columnValue = data[this.filterType].toString().toLowerCase();
        return columnValue.includes(filter);
      }
      else return true;
    }

    this.dataSource.filter = filterValue;
    if (this.dataSource._pageData) this.dataSource.paginator.firstPage();
  }

}
