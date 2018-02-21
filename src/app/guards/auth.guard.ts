import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router
  ) {}

  canActivate() {
    if (AuthService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
