import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from '../../../../domain/model/user';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../../application/services/admin-services/user.service';
import { AlertifyService } from '../../../../application/services/common-services/alertify.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-permission-master',
  templateUrl: './permission-master.component.html',
  styleUrl: './permission-master.component.css'
})

export class PermissionMasterComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private readonly _userService: UserService,
    private readonly _alertify: AlertifyService,
    private _matDialog: MatDialog) { }

  users: User[];
  displayedColumns: string[] = ['index', 'userName', 'employeeId', 'roleName','action'];
  dataSource: MatTableDataSource<User>;
  filterType: string;
  filterText: string;
  filterSource: any[] = [
    { key: "userName", val: "User Name" },
    { key: "roleName", val: "Role" },
  ]

  ngOnInit() {
    this.getAll();
    this.filterType = this.displayedColumns[1];
  }

  getAll() {
    this._userService.getAll().subscribe((data: User[]) => {
      this.users = data;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter() {

  }
}
