//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


//Declarations
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { PluginHomeComponent } from './plugin/plugin-home/plugin-home.component';
import { PluginUpsertComponent } from './plugin/plugin-upsert/plugin-upsert.component';


//Material
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { PluginService } from './services/plugin-services/plugin.service';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { PluginUpsertCanDeactivateGuardService } from './plugin/plugin-upsert/plugin-upsert-canDeactivate-guard.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpInterceptorService } from './services/interceptor/http-interceptor.service';
import { PluginLogHomeComponent } from './plugin-log/plugin-log-home/plugin-log-home.component';
import { PluginLogUpsertComponent } from './plugin-log/plugin-log-upsert/plugin-log-upsert.component';
import { MatSortModule } from '@angular/material/sort';
import { PluginHomePipe } from './application/pipes/plugin-home.pipe';
import {MatExpansionModule} from '@angular/material/expansion';
import { PluginLogChartComponent } from './plugin-log/plugin-log-chart/plugin-log-chart.component';
import { PluginChartComponent } from './plugin/plugin-chart/plugin-chart.component';

@NgModule({
    declarations:
        [
            AppComponent,
            NavigationBarComponent,
            PluginHomeComponent,
            PluginUpsertComponent,
            PluginLogHomeComponent,
            PluginLogUpsertComponent,
            PluginChartComponent,
            PluginLogChartComponent,
            PluginHomePipe,
        ],
    imports:
        [
            AppRoutingModule,
            BrowserModule,
            ReactiveFormsModule,
            FormsModule,
            BrowserAnimationsModule,
            MatSidenavModule,
            MatButtonModule,
            MatSlideToggleModule,
            MatIconModule,
            MatToolbarModule,
            MatListModule,
            MatTableModule,
            MatCheckboxModule,
            MatGridListModule,
            MatPaginatorModule,
            MatCardModule,
            MatDialogModule,
            MatFormFieldModule,
            MatInputModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatRadioModule,
            MatSelectModule,
            HttpClientModule,
            MatBadgeModule,
            MatProgressSpinnerModule,
            MatProgressBarModule,
            FlexLayoutModule, 
            MatSortModule,
            MatExpansionModule
        ],
    providers:
        [
            PluginService,
            PluginUpsertCanDeactivateGuardService,
            { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
        ],
    bootstrap: [AppComponent],
    exports: [],
})

export class AppModule { }

