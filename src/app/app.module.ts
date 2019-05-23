import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routerConfig } from './app.route-config';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiServiceService } from './shared/services/api.service';
import { CookieService } from './shared/services/cookie.service';
import { UserBaseService } from './shared/services/user-base.service';
import { LogoutComponent } from './logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routerConfig),
    BrowserAnimationsModule
  ],
  providers: [ApiServiceService, CookieService, UserBaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
