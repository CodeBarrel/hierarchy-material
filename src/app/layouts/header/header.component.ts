import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() user: any;
  constructor(public router: Router) { }

  ngOnInit() {
  }

  logoutUser(){
    AuthService.logout();
    this.router.navigate(['/login']);
  }

}
