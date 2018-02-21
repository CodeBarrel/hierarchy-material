import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private form: FormBuilder,
              public router: Router) {
    const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

    this.registerForm = form.group({
      'gt_id': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'password_confirmation': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'terms': [null],
    });
  }

  ngOnInit() {
  }

  onRegister(requset) {
    /*this.authService.registerUser(requset).subscribe(data => {
      let req = data.json();
      if(req['status'] == true){
        AuthService.setLoggedIn(req);
        //this.showSuccess(req['data']['name'] + ' Loggedin');
        this.router.navigate(['/dashboard']);
      }
    });*/
  }

}
