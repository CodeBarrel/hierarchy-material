import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {

  constructor(protected httpClient: HttpClient) {
  }

  loginUser(req: Object){
    return this.httpClient.post(environment.tree_backend +'/api/login', req);
  }

  static isLoggedIn(): boolean {
    if (localStorage.getItem("loggedIn") != null) {
      return true;
    }
    return false;
  }

  loginCheck(){
    this.httpClient.get(environment.tree_backend +'/api/loggedin').subscribe(data => {
      return data['status'];
    });
  }

  static setLoggedIn(data): boolean {
    if (localStorage.getItem("loggedIn") == null) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('user_name', data['data']['name']);
      localStorage.setItem('user_email',data['data']['email']);
      localStorage.setItem('token',data['data']['remember_token']);
      return true;
    }
    return false;
  }

  static logout(): boolean {
    if (localStorage.getItem("loggedIn") != null) {
      localStorage.removeItem('loggedIn');
      return true;
    }
    return false
  }

}
