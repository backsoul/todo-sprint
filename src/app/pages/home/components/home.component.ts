import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {}
  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
