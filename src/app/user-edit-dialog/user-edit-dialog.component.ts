import { User } from './../models/user.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent implements OnInit {
  editInfo: User;

  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User) { }

  ngOnInit() {
    this.editInfo = this.user;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
