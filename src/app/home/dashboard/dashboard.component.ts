import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs/Subscription';
import {Auth2Service} from '../../services/auth2.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'app';
  public user: Object;
  public userGTID: Subscription;
  constructor(private authService: AuthService,private auth2Service: Auth2Service) {
    this.auth2Service.getUser().subscribe(data => {
      this.user = data;
    });
  }

  ngOnInit() {

  }

}
