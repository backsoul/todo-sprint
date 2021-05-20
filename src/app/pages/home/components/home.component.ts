import { SnackbarComponent } from './../../../shared/components/snackbar/snackbar.component';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  addDone,
  addWorkInProgress,
  removeWorkInProgress,
  removeTodo,
  removeDone,
  setTodo,
  setWorkInProgress,
  setDone,
  changeLoading,
} from './../../../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from './../../../store/app.reducers';
import { DialogComponent } from './../../../shared/components/dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { take, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.store.dispatch(changeLoading({ loading: true }));

    this.store.select('user').subscribe((data) => {
      this.user = data.user;
      this.sprint = data.sprint;
      if (data.sprint.todos) {
        this.todo = data.sprint.todos;
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
      .collection(`${this.user?.uid}`)
      .valueChanges()
      .subscribe((data: any) => {
        if (data[0]) {
          this.store.dispatch(changeLoading({ loading: false }));
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
        }
      });
  }
  drop(event: CdkDragDrop<string[]>) {
    let currentCard = Number(
      event.previousContainer.id.charAt(event.previousContainer.id.length - 1)
    );
    if (currentCard == 0) {
      this.store.dispatch(changeLoading({ loading: true }));

      this.store.dispatch(
        addWorkInProgress({
          todo: this.sprint.todos[event.previousIndex],
        })
      );
      this.store.dispatch(
        removeTodo({
          todo: this.sprint.todos[event.previousIndex],
        })
      );

      this.firestore.doc(`${this.user.uid}/sprint`).set({ ...this.sprint });
    }
    if (currentCard == 1) {
      this.store.dispatch(changeLoading({ loading: true }));

      this.store.dispatch(
        addDone({
          todo: this.sprint.workinprogress[event.previousIndex],
        })
      );
      this.store.dispatch(
        removeWorkInProgress({
          todo: this.sprint.workinprogress[event.previousIndex],
        })
      );
      this.firestore.doc(`${this.user.uid}/sprint`).set({ ...this.sprint });
    }
    if (currentCard == 2) {
      this.store.dispatch(changeLoading({ loading: true }));

      this.store.dispatch(
        addWorkInProgress({ todo: this.sprint.done[event.previousIndex] })
      );
      this.store.dispatch(
        removeDone({ todo: this.sprint.done[event.previousIndex] })
      );

      this.firestore.doc(`${this.user.uid}/sprint`).set({ ...this.sprint });
    }
  }

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }
  openSnackBar() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: 'some data',
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: 'success',
    });
  }
}
