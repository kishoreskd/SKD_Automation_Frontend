import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

// console.log(environment.apiUrl);

if (environment.production) {
  
  window.console.log = () => { }
  window.console.debug = () => { }
  window.console.info = () => { }
  window.console.warn = () => { }
  window.console.error = () => { }

  enableProdMode();
} else {

}



platformBrowserDynamic().bootstrapModule(AppModule).catch((err) => console.error(err));

