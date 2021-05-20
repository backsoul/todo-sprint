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
  todos: any[] = [];
  user: any;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private store: Store<AppState>,
    private firestore: AngularFirestore
  ) {}
  ngOnInit() {
    this.store.select('user').subscribe((data) => {
      this.user = data.user;
      if (data.sprint.todo) {
        this.todos = data.sprint.todo;
      } else {
        this.todos = [];
      }
    });
  }

  createTodo() {
    this.todos = [...this.todos, this.todo];
    this.firestore.doc(`${this.user.uid}/sprint`).set({ todos: this.todos });
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
