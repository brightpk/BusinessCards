import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Businesscard } from './../models/businesscard.model';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WebcamService } from '../services/webcam.service';

@Component({
  selector: 'app-business-card-edit-dialog',
  templateUrl: './business-card-edit-dialog.component.html',
  styleUrls: ['./business-card-edit-dialog.component.css']
})
export class BusinessCardEditDialogComponent implements OnInit {
  editCard: any;
  cardFormGroup: FormGroup;
  onWebcam: boolean;
  imageBase64: string;
  loading: boolean;

  constructor(
    private webcamService: WebcamService,
    public dialogRef: MatDialogRef<BusinessCardEditDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public card: Businesscard
    ) { }

  ngOnInit() {
    this.onWebcam = false;
    this.imageBase64 = '';
    this.editCard = this.card;

    this.cardFormGroup = this.formBuilder.group({
      id: this.card.id,
      company: this.card.company,
      firstname: [this.card.firstname, Validators.required],
      lastname: [this.card.lastname, Validators.required],
      email: [this.card.email, Validators.required],
      phoneNumber: [this.card.phoneNumber, Validators.required],
      image: this.card.image
    });
  }

  openWebcam(card) {
    this.onWebcam = true;
  }

  closeWebcam() {
    this.onWebcam = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.cardFormGroup.valid) {
      this.dialogRef.close(this.cardFormGroup.value);
    }
  }

  isLoading(loading) {
    this.loading = loading;
  }

  receiveWebcamImage(imageBase64) {
    this.imageBase64 = imageBase64;
  }

  receiveTextDetection(textDetection) {
    const cardID = this.editCard.id;
    this.editCard = this.webcamService.getDataFields(textDetection);
    this.editCard.id = cardID;
    this.editCard.image = this.imageBase64;
    // this.card = this.editCard;
    this.cardFormGroup = this.editCard;
    this.closeWebcam();
  }

}
