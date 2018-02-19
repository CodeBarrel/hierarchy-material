import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {path: '**', redirectTo: 'home'},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
