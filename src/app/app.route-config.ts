import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
export const routerConfig: Routes = [
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent
    },
    {
        path:'logout',
        component:LogoutComponent
    }
];
