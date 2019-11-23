import { UsersService } from './../services/users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User;
  loading: boolean;
  subscription: Subscription;

  constructor(
    private userSerivce: UsersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.subscription = new Subscription();
    this.user = new User();
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('ngOnDestroy profile');
  }

  openSnackBar(msg: string, action: string, time?: number) {
    this.snackBar.open(msg, action, { duration: time });
  }

  getUsers() {
    const subscription = this.userSerivce.usersCollection.snapshotChanges()
    .pipe(map(changes =>
      changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(user => {
      this.user = user[0];
    });

    this.subscription.add(subscription);
  }

  update(user) {
    this.loading = true;
    this.userSerivce.updateUser(user.id, user)
    .then(res => {
      console.log('Successfully UPDATED!');
      this.loading = false;
      this.openSnackBar('Successfully UPDATED user info!', 'x', 5000 );
    })
    .catch(err => {
      console.log('Fail to UPDATE user information :(');
      this.loading = false;
      this.openSnackBar('Fail to UPDATE', 'x', 5000 );
    });

    this.loading = false;
  }

  openEditDialog(user, event): void {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = user;
    const dialogRef = this.dialog.open(UserEditDialogComponent, dialogConfig);

    const subscription =  dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.update(res);
      }
    });

    this.subscription.add(subscription);
  }


}
