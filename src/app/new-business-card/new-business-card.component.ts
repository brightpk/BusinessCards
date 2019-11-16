import { BusinesscardsService } from './../services/businesscards.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Businesscard } from '../models/businesscard.model';
import { WebcamImage } from 'ngx-webcam/src/app/modules/webcam/domain/webcam-image';

@Component({
  selector: 'app-new-business-card',
  templateUrl: './new-business-card.component.html',
  styleUrls: ['./new-business-card.component.css']
})
export class NewBusinessCardComponent implements OnInit {
  invalid: boolean;
  submitted: boolean;
  onWebcam: boolean;
  // businessCardForm: FormGroup;
  businessCard: Businesscard;
  @ViewChild('businessCardForm', {static: true}) public form: NgForm;

  constructor(private formBuilder: FormBuilder, private businessCardsService: BusinesscardsService) { }

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

  toggleWebcam() {
    this.onWebcam = !this.onWebcam;
  }

  receiveWebcamImage(imageBase64) {
    this.businessCard.image = imageBase64;
  }

  receiveTextDetection(textDetection) {
    console.log(textDetection.responses[0].textAnnotations);
  }

  add() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log('Missing some fields/invalid. Not able to add a new business card');
    } else if (this.form.valid) {
      this.businessCardsService.addBusinessCard(this.businessCard)
      .then(res => {
        console.log('Successfully ADDED!');
        this.submitted = false;
      })
      .catch(err => {
        console.log('Fail to ADD a new business card :(');
      });
    }

  }


}
