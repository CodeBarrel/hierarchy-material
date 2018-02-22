import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
