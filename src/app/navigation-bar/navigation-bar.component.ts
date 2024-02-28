import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../application/services/common-services/loader.service';
import { DepartmentService } from '../application/services/admin-services/department.service';
import { Department } from '../domain/model/department.model';
import { LocalStorageService } from '../application/services/common-services/local-storage.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../application/services/common-services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit, AfterViewInit {
  opened = true;
  loaderVisible: boolean = false;
  departmentId: number;
  depSelections: Array<Department> = new Array<Department>();
  isLoggedIn: boolean = true;
  userName: string = "";

  constructor(private _router: Router,
    public _loaderService: LoaderService,
    private readonly _departmentService: DepartmentService,
    private readonly _localStorageService: LocalStorageService,
    private _cdr: ChangeDetectorRef,
    private _activateRoute: ActivatedRoute,
    public _authService: AuthService) {

    // this._router.events.subscribe((routerEvent: Event) => {

    //   if (routerEvent instanceof NavigationStart) {
    //     this.showLoadingIndicator = true;
    //   }

    //   if (routerEvent instanceof NavigationEnd) {
    //     this.showLoadingIndicator = false;
    //   }
    // })
  }
  ngAfterViewInit(): void {

  }

  ngOnInit() {  
    this.userName = this._authService.getUserNameFromToken();

    this._loaderService.getLoaderVisibility().subscribe((isLoading: boolean) => {
      this.loaderVisible = isLoading;
      this._cdr.detectChanges();
    })

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

      this.selectionChange();
      this._cdr.detectChanges();
    });
  }

  selectionChange() {

    if (this._localStorageService.getDepartmentId() != this.departmentId) {

      this._localStorageService.setDepartmentId(this.departmentId);

      if (this._router.navigated === false) {
        this._router.navigateByUrl("/");
        this._cdr.detectChanges();
      }
      else {
        this._router.navigateByUrl("/plugin/home").then(() => {
          this._router.navigateByUrl("");
          this._cdr.detectChanges();
        })
      }
    }
  }

  onLogout() {
    // this._loaderService.loaderVisible.next(true);
    // const timer = setTimeout(() => {
    //   if (!this.loaderVisible) {
    //     return;
    //   }
    //   this._authService.logOut();
    //   this._router.navigate(["/login"]);
    //   this._loaderService.loaderVisible.next(false);
    // }, 5000)

    this._authService.logOut();
    this._router.navigate(["/login"]);
  }

}
