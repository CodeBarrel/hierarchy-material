import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {isObject} from "util";
import {AuthService} from '../../services/auth.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private form: FormBuilder,
    public router: Router,
    private authService: AuthService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    this.loginForm = form.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
    });

  }

  ngOnInit() {
    if (AuthService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onLogin(requset) {
    let message = null;
    this.authService.loginUser(requset).subscribe(
      (res) => {
        if (isObject(res) == true) {
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('user_name', res['name']);
          localStorage.setItem('user_email', res['email']);
          this.toastr.success('You have successfully logged in', `Welcome ${res['name']}!`);
          console.log('You have successfully logged in');
          setTimeout(() => {
            this.router.navigate(['/home']);
          },1500)
        }else{
          localStorage.setItem('loggedIn', 'false');
          console.log('Something went wrong');
          this.toastr.error('Something went wrong', `Error!`);
        }
      },
      (msg) => {
        if(msg.error.errors.email){
          message = msg.error.errors.email;
        }else {
          message = msg.error.message;
        }
        console.log(message);
        this.toastr.error(message, 'Error!');
      });
  }

}
