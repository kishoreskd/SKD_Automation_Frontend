import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../domain/model/user';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../application/services/admin-services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertifyService } from '../../application/services/common-services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { UserUpsertComponent } from '../user-upsert/user-upsert.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  users: User[];
  displayedColumns: string[] = ['index', 'userName', 'roleName', 'createdDate','action'];
  dataSource: MatTableDataSource<User>;
  filterType: string;
  filterText: string;
  filterSource: any[] = [
    { key: "userName", val: "User Name" },
    { key: "roleName", val: "Role" },

  ]

  constructor(private readonly _userService: UserService,
    private readonly _alertify: AlertifyService,
    private _matDialog: MatDialog) { }

  ngOnInit() {
    this.getAll();
    this.filterType = this.displayedColumns[1];
  }

  onOpenPrjAddDialog() {
    const data = new User();
    data.id = 0;
    const dialogRef = this._matDialog.open(UserUpsertComponent, { width: "30%", data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAll();
        }
      }
    })
  }

  onEditPrjDialog(data: User) {
    const diaDialogRef = this._matDialog.open(UserUpsertComponent, { width: "30%", data })
    diaDialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAll();
        }
      }
    })
  }

  public onRemovePrjLog(id: number) {

    const isConfirm = this._alertify.confirm("Are you sure want to remove ?", () => {
      this._userService.remove(id).subscribe(data => {
        this.getAll();
        this._alertify.success("User has been removed!");
      });
    })
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
