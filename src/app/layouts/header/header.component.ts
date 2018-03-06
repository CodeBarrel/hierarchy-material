import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {Auth2Service} from '../../services/auth2.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() user: any;
  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    public auth2Service: Auth2Service) {

  }

  ngOnInit() {
  }

  logoutUser(){
    AuthService.logout();
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth2Service.logout();
  }

}
