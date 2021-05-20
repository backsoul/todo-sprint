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
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private store: Store<AppState>
  ) {}

  createTodo() {
    this.store.dispatch(addTodo({ todo: this.todo }));
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
