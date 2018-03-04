import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {ForgetPasswordComponent} from '../auth/forget-password/forget-password.component';
import {DashboardComponent} from '../home/dashboard/dashboard.component';
import {HierarchyComponent} from '../home/hierarchy/hierarchy.component';
import {ViewComponent} from '../home/hierarchy/view/view.component';
import {AuthComponent} from '../auth/auth.component';
import {Auth2Guard} from '../guards/auth2.guard';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [Auth2Guard],
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
    component: AuthComponent
  },
  {
    path: 'register',
    component: AuthComponent
  },
  {
    path: 'forgot-password',
    component: ForgetPasswordComponent
  },
  {path: '**', redirectTo: 'dashboard'},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
