import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { LoaderService } from '../services/common/loader.service';
import { DepartmentService } from '../services/department/department.service';
import { Department } from '../domain/model/department';
import { LocalStorageService } from '../services/common/local-storage.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  opened = true;
  // showLoadingIndicator = true;
  departmentId: number;
  depSelections: Array<Department> = new Array<Department>();

  constructor(private _router: Router,
    public _loaderService: LoaderService,
    private readonly _departmentService: DepartmentService,
    private readonly _localStorageService: LocalStorageService) {

    // this._router.events.subscribe((routerEvent: Event) => {

    //   if (routerEvent instanceof NavigationStart) {
    //     this.showLoadingIndicator = true;
    //   }

    //   if (routerEvent instanceof NavigationEnd) {
    //     this.showLoadingIndicator = false;
    //   }
    // })
  }

  ngOnInit() {
    this.loadDepartmentSelections();
  }

  loadDepartmentSelections() {
    this._departmentService.getAll().subscribe((data: Department[]) => {

      this.depSelections = data;

      if (this._localStorageService.getDepartmentId() > 0) {
        this.departmentId = this._localStorageService.getDepartmentId();
      }
      else {
        this.departmentId = this.depSelections[0].departmentId;
      }

    });
  }

  selectionChange() {
    this._localStorageService.updateDepartmentId(this.departmentId);
    this._router.navigate([""]);
  }
}
