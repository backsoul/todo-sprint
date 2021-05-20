import { UserInterface } from './../../../core/interfaces/user.interface';
import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {}
  signInGoogle() {
    this.auth
      .GoogleAuth()
      .then((data) => {
        if (data.user) {
          const newUser = new UserInterface(
            data.user.uid,
            data.user.displayName,
            data.user?.photoURL,
            data.user.email
          );
          this.firestore.doc(`${data.user.uid}/usuario`).set({ ...newUser });
        }
        this.router.navigate(['home']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
