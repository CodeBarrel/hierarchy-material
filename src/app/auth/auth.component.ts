import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Auth2Service} from '../services/auth2.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  routerURL: string;
  constructor(router: Router,public auth: Auth2Service) {
    this.routerURL = router.url;
  }

  ngOnInit() {
  }

}
