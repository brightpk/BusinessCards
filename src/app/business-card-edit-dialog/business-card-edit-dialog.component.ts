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
  editCard: Businesscard;
  onWebcam: boolean;
  imageBase64: string;
  loading: boolean;

  constructor(
    private webcamService: WebcamService,
    public dialogRef: MatDialogRef<BusinessCardEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public card: Businesscard
    ) { }

  ngOnInit() {
    this.onWebcam = false;
    this.imageBase64 = '';
    this.editCard = this.card;
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
    this.card = this.editCard;
    this.closeWebcam();
  }

}
