import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  routerURL: string;
  constructor(router: Router) {
    this.routerURL = router.url;
  }

  ngOnInit() {
  }

}
