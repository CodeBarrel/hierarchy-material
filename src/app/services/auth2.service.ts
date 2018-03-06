import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import {isNullOrUndefined} from "util";

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class Auth2Service {

  userObs: Observable<User>;
  user: User;

  constructor(public afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              public router: Router) {

    this.userObs = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          this.user = user;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null)
        }
      });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserDate(credential.userObs);
        this.router.navigate(['/dashboard']);
      })
  }

  private updateUserDate(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data);
  }

  getUser(){
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }

  public isLoggedIn(){
    return this.afAuth.authState.map(auth => {
      if (isNullOrUndefined(auth)) {
        return false;
      } else {
        return true;
      }
    });
  }

}
