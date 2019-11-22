import { User } from './../models/user.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent implements OnInit {
  editInfo: User;
  userFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public user: User) { }

  ngOnInit() {
    this.editInfo = this.user;

    this.userFormGroup = this.formBuilder.group({
      id: this.user.id,
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: this.user.email,
      phone: this.user.phone,
      dob: this.user.dob,
      address: this.user.address
    });
  }

  onSubmit() {
    if (this.userFormGroup.valid) {
      this.dialogRef.close(this.userFormGroup.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
