import { AngularFirestore } from '@angular/fire/firestore';
import { addTodo } from './../../../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { TodoInterface } from './../../../core/interfaces/todo.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  todo: string = '';
  sprint: any;
  todos: string[] = [];
  user: any;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private store: Store<AppState>,
    private firestore: AngularFirestore
  ) {}
  ngOnInit() {
    this.store.select('user').subscribe((data) => {
      this.user = data.user;
      this.sprint = data.sprint;
    });
  }

  createTodo() {
    this.store.dispatch(addTodo({ todo: this.todo }));
    console.log(this.sprint);
    this.firestore.doc(`${this.user.uid}/sprint`).set({ ...this.sprint });
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
