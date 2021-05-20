import { UserInterface } from './core/interfaces/user.interface';
import { AppState } from './store/app.reducers';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setUser, removeUser } from './store/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-sprint';
  constructor(private auth: AngularFireAuth, private store: Store<AppState>) {}
  ngOnInit() {
    this.auth.authState.subscribe((data) => {
      if (data != null) {
        const user = new UserInterface(
          data.uid,
          data.displayName,
          data.photoURL,
          data.email
        );
        this.store.dispatch(setUser({ user: { ...user } }));
      } else {
        this.store.dispatch(removeUser());
      }
    });
  }
}
