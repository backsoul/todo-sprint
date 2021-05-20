import { LoaderComponent } from './shared/components/loader/loader.component';
import { MatDialog } from '@angular/material/dialog';
import { UserInterface } from './core/interfaces/user.interface';
import { AppState } from './store/app.reducers';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  setUser,
  removeUser,
  changeLoading,
} from './store/actions/user.actions';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-sprint';
  constructor(
    private auth: AngularFireAuth,
    private store: Store<AppState>,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    this.store.select('user').subscribe((data) => {
      if (data.loading == true) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
    this.auth.authState.subscribe((data) => {
      if (data != null) {
        const user = new UserInterface(
          data.uid,
          data.displayName,
          data.photoURL,
          data.email
        );
        this.store.dispatch(changeLoading({ loading: false }));
        this.store.dispatch(setUser({ user: { ...user } }));
      } else {
        this.store.dispatch(removeUser());
      }
    });
  }
}
