import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  loading: boolean;

  constructor(
    private userSerivce: UsersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.user = new User();
    this.getUsers();
  }

  openSnackBar(msg: string, action: string, time?: number) {
    this.snackBar.open(msg, action, { duration: time });
  }

  getUsers() {
    this.userSerivce.usersCollection.snapshotChanges()
    .pipe(map(changes =>
      changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(user => {
      this.user = user[0];
    });
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

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.update(res);
      }
    });
  }


}
