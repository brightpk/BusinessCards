import { BusinesscardsService } from './../services/businesscards.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Businesscard } from '../models/businesscard.model';
import { MatSnackBar } from '@angular/material';
import { isNumber } from 'util';
import { WebcamService } from '../services/webcam.service';

@Component({
  selector: 'app-new-business-card',
  templateUrl: './new-business-card.component.html',
  styleUrls: ['./new-business-card.component.css']
})
export class NewBusinessCardComponent implements OnInit {
  invalid: boolean;
  submitted: boolean;
  onWebcam: boolean;
  loading: boolean;
  // businessCardForm: FormGroup;
  businessCard: Businesscard;
  @ViewChild('businessCardForm', {static: true}) public form: NgForm;
  // private snackBar: MatSnackBar;

  constructor(
    private webcamService: WebcamService,
    private businessCardsService: BusinesscardsService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    // this.businessCardForm = this.formBuilder.group({
    //   firstname: ['', Validators.required],
    //   lastname: ['', Validators.required],
    //   email: ['', Validators.required],
    //   phoneNumber: '',
    //   cardImage: ''
    // });
    this.businessCard = new Businesscard();
    this.invalid = false;
    this.submitted = false;
    this.onWebcam = false;
  }

  isLoading(loading) {
    this.loading = loading;
  }

  toggleWebcam() {
    this.onWebcam = !this.onWebcam;
  }

  receiveWebcamImage(imageBase64) {
    this.businessCard.image = imageBase64;
  }

  receiveTextDetection(textDetection) {
    const data = this.webcamService.getDataFields(textDetection);
    const tmp = this.businessCard.image;
    this.businessCard = data;
    this.businessCard.image = tmp;
  }

  openSnackBar(msg: string, action: string, time?: number) {
    this.snackBar.open(msg, action, { duration: time });
  }

  add() {
    this.loading = true;
    this.submitted = true;
    if (this.form.invalid) {
      console.log('Missing some fields/invalid. Not able to add a new business card');
      this.loading = false;
    } else if (this.form.valid) {
      this.businessCardsService.addBusinessCard(this.businessCard)
      .then(res => {
        console.log('Successfully ADDED!');
        this.submitted = false;
        this.loading = false;
        this.openSnackBar('Successfully ADDED!', 'x', 5000 );
      })
      .catch(err => {
        console.log('Fail to ADD a new business card :(');
        this.openSnackBar('Fail to add a new business card', 'x', 5000 );
        this.loading = false;
      });
    }

    this.loading = false;

  }


}
