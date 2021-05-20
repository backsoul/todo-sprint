import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppState } from './../../../store/app.reducers';
import { Store } from '@ngrx/store';
import { UserInterface } from './../../../core/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user?: UserInterface;
  constructor(
    private store: Store<AppState>,
    private auth: AngularFireAuth,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.store.select('user').subscribe(({ user }) => {
      this.user = user;
    });
  }
  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
