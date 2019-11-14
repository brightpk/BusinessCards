import { BusinesscardsService } from './../services/businesscards.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Businesscard } from '../models/businesscard.model';

@Component({
  selector: 'app-new-business-card',
  templateUrl: './new-business-card.component.html',
  styleUrls: ['./new-business-card.component.css']
})
export class NewBusinessCardComponent implements OnInit {
  businessCardForm: FormGroup;
  businessCard: Businesscard;

  constructor(private formBuilder: FormBuilder, private businessCardsService: BusinesscardsService) { }

  ngOnInit() {
    this.businessCardForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: '',
      image: ''
    });

  }

  add() {
    this.businessCard = this.businessCardForm.value;
    this.businessCardsService.addBusinessCard(this.businessCard)
    .then(res => {
      console.log('Successfully ADDED!');
    })
    .catch(err => {
      console.log('Fail to ADD a new business card :(');
    });
  }


}
