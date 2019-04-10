import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';

import {
  routes
} from './app-routing.module';
import {
  AppComponent
} from './app.component';
import {
  LoginComponent
} from './login/login.component';
import {
  DashboardComponent
} from './dashboard/dashboard.component';
import {
  RouterModule,
  Router
} from '@angular/router';
import {
  HeaderComponent
} from './core/header/header.component';
import {
  MessageComponent
} from './core/message/message.component';
import {
  CommonService
} from './core/helpers/common.service';
import {
  Logging
} from './core/helpers/helper.model';
import {
  LogingService
} from './core/helpers/loging.service';
import {
  AuthService
} from './core/helpers/auth.service';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  LoginService
} from './login/login.service';
import {
  DashboardService
} from './dashboard/dashboard.service'
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http'
import {
  ToastModule
} from 'primeng/toast';
import {
  TableModule
} from 'primeng/table';
import {
  DataViewModule
} from 'primeng/dataview';
import {
  ProjectsService
} from './projects/projects.service';
import {
  WebRequest
} from './core/web.request';
import {
  MessageHandler
} from './core/message/message.service';
import {
  MessageService
} from 'primeng/api';
import {
  CoreModule
} from './core/core.module';
import {
  RouterExtensionService
} from './core/helpers/router-extension.service';
import {
  ProgressSpinnerModule
} from 'primeng/progressspinner';
import {
  Ng4LoadingSpinnerModule
} from 'ng4-loading-spinner';
import {
  Ng4LoadingSpinnerService
} from 'ng4-loading-spinner';
import {
  BreadCrumbService
} from './core/bread-crumbs/bread-crumb.service';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  AuthInterceptor
} from './core/helpers/auth-interceptor';
import {
  OverlayPanelModule
} from 'primeng/overlaypanel';
@ NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    DataViewModule,
    TableModule,
    CoreModule,
    OverlayPanelModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [LoginService, DashboardService, CommonService,
    WebRequest,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ProjectsService, LogingService,
    MessageHandler, MessageService, RouterExtensionService,
    Ng4LoadingSpinnerService, BreadCrumbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
