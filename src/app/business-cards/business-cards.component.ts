import { map } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BusinesscardsService } from '../services/businesscards.service';
import { Businesscard } from '../models/businesscard.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-business-cards',
  templateUrl: './business-cards.component.html',
  styleUrls: ['./business-cards.component.css']
})
export class BusinessCardsComponent implements OnInit, OnChanges {
  businessCards: Businesscard[];
  @Input() foundBusinessCardsList: Businesscard[];
  @Input() searchFor: string;
  @Input() searchBy: string;
  prevSearch = '';

  constructor(
    private businessCardsService: BusinesscardsService,
    private activatedRoute: ActivatedRoute) { }

    ngOnChanges(changes: SimpleChanges) {
      try {
        this.businessCards = changes.foundBusinessCardsList.currentValue;
      } catch (error) {}
  }

  ngOnInit() {

    if (this.searchFor === undefined) {
      this.getBusinessCards();
    }
  }

  getBusinessCards() {
    this.businessCardsService.getBusinessCardsCollection().snapshotChanges()
    .pipe(map(changes =>
      changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(card => {
      this.businessCards = card;
    });
  }

}
