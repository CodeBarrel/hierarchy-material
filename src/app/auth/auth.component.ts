import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Auth2Service} from '../services/auth2.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  routerURL: string;
  loggedIn: boolean = false;

  constructor(public router: Router, public auth: Auth2Service) {
    this.routerURL = this.router.url;
  }

  ngOnInit() {
    this.auth.isLoggedIn().subscribe(user => {
        (user) ? this.router.navigate(['/dashboard']) : this.loggedIn = true;
      },
      err => {
        this.loggedIn = true;
      });
  }

}
