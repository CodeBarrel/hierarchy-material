import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Auth2Service} from '../services/auth2.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class Auth2Guard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}
  canActivate(): Observable<boolean> {
    console.log(this.auth);
    return Observable.of(this.auth)
      .take(1)
      .map(state => !!state)
      .do(authenticated => {
        if
        (!authenticated) this.router.navigate([ '/login' ]);
      })
  }
}
