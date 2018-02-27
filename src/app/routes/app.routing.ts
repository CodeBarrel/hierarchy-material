import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {LoginComponent} from '../auth/login/login.component';
import {RegisterComponent} from '../auth/register/register.component';
import {ForgetPasswordComponent} from '../auth/forget-password/forget-password.component';
import {DashboardComponent} from '../home/dashboard/dashboard.component';
import {HierarchyComponent} from '../home/hierarchy/hierarchy.component';
import {ViewComponent} from '../home/hierarchy/view/view.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'hierarchy',
        component: HierarchyComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ViewComponent
          }
        ]
      }
    ]
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
  {path: '**', redirectTo: 'dashboard'},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
