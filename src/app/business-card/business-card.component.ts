import { Component, OnInit, Input } from '@angular/core';
import { Businesscard } from '../models/businesscard.model';
import { BusinesscardsService } from '../services/businesscards.service';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {
  @Input() businessCards: Businesscard[];
  tmpID: string;
  closeForm: boolean;

  constructor(private businessCardsService: BusinesscardsService) { }

  ngOnInit() {
    this.tmpID = '';
    this.closeForm = true;
  }

  openEditForm(card) {
    this.tmpID = card.id;
    console.log(card.id);
  }

  closeEditForm() {
    this.tmpID = '';
  }

  update(card) {
    this.businessCardsService.updateBusinessCard(card.id, card)
    .then(res => {
      console.log('Successfully UPDATED!');
    })
    .catch(err => {
      console.log('Fail to UPDATE a particular business card :(');
    });
  }

}
