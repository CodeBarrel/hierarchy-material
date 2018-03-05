import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Auth2Service} from '../services/auth2.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {AngularFireAuth} from 'angularfire2/auth';
import {isNullOrUndefined} from 'util';

@Injectable()
export class Auth2Guard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.auth.authState.map(auth => {
      if (isNullOrUndefined(auth)) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    });
  }
}
