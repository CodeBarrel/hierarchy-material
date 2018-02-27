import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'app';
  public user;
  public userGTID: Subscription;
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.userGTID = this.authService.getUserGTID({'email': localStorage.getItem("user_email")}).subscribe((data) => {
      console.log(data);
      this.user = data;
      return data;
    });
  }

}
