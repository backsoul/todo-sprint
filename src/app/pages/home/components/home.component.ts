import {
  addDone,
  addWorkInProgress,
  removeWorkInProgress,
  removeTodo,
  removeDone,
} from './../../../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from './../../../store/app.reducers';
import { DialogComponent } from './../../../shared/components/dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  todo: any[] = [];
  workinprogress: any[] = [];
  done: any[] = [];
  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('user').subscribe(({ sprint }) => {
      if (sprint.todos) {
        this.todo = sprint.todos;
      }
      if (sprint.workinprogress) {
        this.workinprogress = sprint.workinprogress;
      }
      if (sprint.done) {
        this.done = sprint.done;
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    let currentCard = Number(
      event.previousContainer.id.charAt(event.previousContainer.id.length - 1)
    );
    if (currentCard == 0) {
      this.store.dispatch(
        addWorkInProgress({ todo: event.previousContainer.data[0] })
      );
      this.store.dispatch(
        removeTodo({ todo: event.previousContainer.data[0] })
      );
    }
    if (currentCard == 1) {
      this.store.dispatch(addDone({ todo: event.previousContainer.data[0] }));
      this.store.dispatch(
        removeWorkInProgress({ todo: event.previousContainer.data[0] })
      );
    }
    if (currentCard == 2) {
      this.store.dispatch(
        addWorkInProgress({ todo: event.previousContainer.data[0] })
      );
      this.store.dispatch(
        removeDone({ todo: event.previousContainer.data[0] })
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);
  }
}
