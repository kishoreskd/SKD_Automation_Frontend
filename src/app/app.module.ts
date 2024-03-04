//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


//Declarations
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { PluginHomeComponent } from './components/plugin/plugin-home/plugin-home.component';
import { PluginUpsertComponent } from './components/plugin/plugin-upsert/plugin-upsert.component';


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
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { PluginService } from './application/services/plugin-services/plugin-base.service';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { PluginUpsertCanDeactivateGuardService } from './application/guards/plugin-upsert-canDeactivate.guard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpInterceptorService } from './application/interceptor/http.interceptor';
import { PluginLogHomeComponent } from './components/plugin/log-home/plugin-log-home.component';
import { PluginLogUpsertComponent } from './components/plugin/log-upsert/plugin-log-upsert.component';
import { MatSortModule } from '@angular/material/sort';
import { PluginHomePipe } from './application/pipes/plugin-home.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { PluginLogChartComponent } from './components/dashbord/charts/plugin-log-chart/plugin-log-chart.component';
import { PluginChartComponent } from './components/dashbord/charts/plugin-chart/plugin-chart.component';
import { MonthPickerComponent } from './common/month-picker/month-picker.component';
import { DashbordComponent } from './components/dashbord/home/dashbord.component';
import { MatMenuModule } from '@angular/material/menu';
import { YearPickerComponent } from './common/year-picker/year-picker.component';
import { MatDivider } from '@angular/material/divider';
import { MinutesToHoursPipe } from './application/pipes/minutesToHours.pipe';
import { ProductivityChartComponent } from './components/dashbord/charts/productivity-chart/productivity-chart.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgToastModule } from 'ng-angular-popup';
import { LoginComponent } from './components/login/login.component';
import { UserHomeComponent } from './components/admins/user/user-home/user-home.component';
import { PluginLogService } from './application/services/plugin-services/plugin-log.service';
import { LocalStorageService } from './application/services/common-services/local-storage.service';
import { LoginService } from './application/services/common-services/login.service';
import { DepartmentService } from './application/services/admin-services/department.service';
import { DashbordService } from './application/services/plugin-services/dashbord.service';
import { AlertifyService } from './application/services/common-services/alertify.service';
import { LoaderService } from './application/services/common-services/loader.service';
import { UserUpsertComponent } from './components/admins/user/user-upsert/user-upsert.component';
import { UserService } from './application/services/admin-services/user.service';
import { RoleService } from './application/services/admin-services/role.service';
import { AuthService } from './application/services/common-services/auth.service';
import { DatePickerComponent } from './common/date-picker/date-picker.component';
import { PluginKeyComponent } from './components/plugin/plugin-key/plugin-key.component';
import { DepartmentHomeComponent } from './components/admins/department/department-home/department-home.component';
import { DepartmentUpsertComponent } from './components/admins/department/department-upsert/department-upsert.component';
import { AdminHomeComponent } from './components/admins/home/admin-home.component';
import { PluginPieChartComponent } from './components/dashbord/charts/plugin-pie-chart/plugin-pie-chart.component';

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
            MonthPickerComponent,
            YearPickerComponent,
            DashbordComponent,
            MinutesToHoursPipe,
            ProductivityChartComponent,
            LoginComponent,
            UserHomeComponent,
            UserUpsertComponent,
            DatePickerComponent,
            PluginKeyComponent,
            DepartmentHomeComponent,
            DepartmentUpsertComponent,
            AdminHomeComponent,
            PluginPieChartComponent
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
            MatExpansionModule,
            MatMenuModule,
            MatDivider,
            MatTabsModule,
            NgToastModule,
            MatRadioModule
        ],
    providers:
        [
            { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
            // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
            PluginService,
            PluginLogService,
            DepartmentService,
            DashbordService,
            LoginService,
            LocalStorageService,
            AlertifyService,
            LoaderService,
            UserService,
            RoleService,
            AuthService,
            
            PluginUpsertCanDeactivateGuardService
        ],
    bootstrap: [AppComponent],
    exports: [],
})

export class AppModule { }

