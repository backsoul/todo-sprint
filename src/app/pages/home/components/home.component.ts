import { AngularFirestore } from '@angular/fire/firestore';
import {
  addDone,
  addWorkInProgress,
  removeWorkInProgress,
  removeTodo,
  removeDone,
  addTodo,
  setTodo,
  setWorkInProgress,
  setDone,
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
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  todo: any[] = [];
  workinprogress: any[] = [];
  done: any[] = [];
  user: any;
  sprint: any;
  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((data) => {
      this.user = data.user;
      this.sprint = data.sprint;
      if (data.sprint.todo) {
        this.todo = data.sprint.todo;
      }
      if (data.sprint.workinprogress) {
        this.workinprogress = data.sprint.workinprogress;
      }
      if (data.sprint.done) {
        this.done = data.sprint.done;
      }
    });
    this.obtainDataFirebase();
  }
  obtainDataFirebase() {
    this.firestore
      .collection(`${this.user.uid}`)
      .valueChanges()
      .subscribe((data: any) => {
        if (data[0].todos) {
          this.store.dispatch(setTodo({ todos: data[0].todos }));
        }
        if (data[0].workinprogress) {
          this.store.dispatch(
            setWorkInProgress({ todos: [...data[0].workinprogress] })
          );
        }
        if (data[0].done) {
          this.store.dispatch(setDone({ todos: [...data[0].done] }));
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
      // this.firestore.doc(`${this.user.uid}`).set({ sprint: [...this.sprint] });
    }
    if (currentCard == 1) {
      this.store.dispatch(addDone({ todo: event.previousContainer.data[0] }));
      this.store.dispatch(
        removeWorkInProgress({ todo: event.previousContainer.data[0] })
      );
    }
    if (currentCard == 2) {
      this.store.dispatch(
        removeDone({ todo: event.previousContainer.data[0] })
      );
      this.store.dispatch(
        addWorkInProgress({ todo: event.previousContainer.data[0] })
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);
  }
}
