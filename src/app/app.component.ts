import { Component, OnInit } from '@angular/core';
import { AuthService } from './application/services/common-services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(public _authService: AuthService) { }

  ngOnInit(): void {
    // this.isLoggedIn = this._authService.isLoggedIn();
    // console.log(this.isLoggedIn);

    this.isLoggedIn = this._authService.isLoggedIn();
    console.log(this.isLoggedIn);

    // this._authService.isLoggedIn().subscribe((data: boolean) => {
    //   this.isLoggedIn = data;
    //   console.log(this.isLoggedIn);
    // });

  }
}
