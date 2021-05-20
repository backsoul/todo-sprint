import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import auth from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.auth.GoogleAuthProvider());
  }
  AuthLogin(provider: any) {
    return this.auth.signInWithPopup(provider);
  }
  isAuth() {
    return this.auth.authState.toPromise().then((data) => {
      return data;
    });
  }
}
