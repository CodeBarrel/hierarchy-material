import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {AuthGuard} from '../guards/auth.guard';
import {LoginComponent} from '../auth/login/login.component';
import {RegisterComponent} from '../auth/register/register.component';
import {ForgetPasswordComponent} from '../auth/forget-password/forget-password.component';
import {AuthComponent} from '../auth/auth.component';
import {DashboardComponent} from '../home/dashboard/dashboard.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgetPasswordComponent
  },
  {path: '**', redirectTo: 'home'},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
