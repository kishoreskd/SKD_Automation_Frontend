import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './application/services/common-services/auth.service';
import { LoaderService } from './application/services/common-services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean = false;
  isLoading: boolean;

  constructor(public _authService: AuthService,
    public _loaderService: LoaderService,
    private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._loaderService.getLoaderVisibility().subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
      this._cdr.detectChanges();
    });
  }
}
