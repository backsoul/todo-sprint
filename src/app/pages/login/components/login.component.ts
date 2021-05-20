import { changeLoading } from './../../../store/actions/user.actions';
import { SnackbarComponent } from './../../../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInterface } from './../../../core/interfaces/user.interface';
import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private firestore: AngularFirestore,
    private snackbar: MatSnackBar,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}
  signInGoogle() {
    this.store.dispatch(changeLoading({ loading: true }));
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
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: `¡Welcome to TodoSprint!, ${data.user.displayName}.`,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            panelClass: 'success',
            duration: 2000,
          });
          this.store.dispatch(changeLoading({ loading: false }));
        }
        this.router.navigate(['']);
      })
      .catch((err) => {
        console.log(err);
        this.store.dispatch(changeLoading({ loading: false }));
      });
  }
}
