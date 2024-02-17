import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { LoaderService } from '../services/common/loader.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  opened = true;
  // showLoadingIndicator = true;


  constructor(private _router: Router, public _loaderService: LoaderService) {

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
    console.log(this._loaderService.loaderVisible);
  }

}
