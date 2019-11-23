import { map } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { BusinesscardsService } from '../services/businesscards.service';
import { Businesscard } from '../models/businesscard.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-business-cards',
  templateUrl: './business-cards.component.html',
  styleUrls: ['./business-cards.component.css']
})
export class BusinessCardsComponent implements OnInit, OnChanges, OnDestroy {
  businessCards: Businesscard[];
  @Input() foundBusinessCardsList: Businesscard[];
  @Input() searchFor: string;
  @Input() searchBy: string;
  prevSearch = '';
  subscription: Subscription;

  constructor(
    private businessCardsService: BusinesscardsService,
    private activatedRoute: ActivatedRoute) { }

    ngOnChanges(changes: SimpleChanges) {
      try {
        this.businessCards = changes.foundBusinessCardsList.currentValue;
      } catch (error) {}
    }

  ngOnInit() {
    this.subscription = new Subscription();

    if (this.searchFor === undefined) {
      this.getBusinessCards();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('ngOnDestroy business cards List');
  }

  getBusinessCards() {
    const subscription = this.businessCardsService.getBusinessCardsCollection().snapshotChanges()
    .pipe(map(changes =>
      changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(card => {
      this.businessCards = card;
    });

    this.subscription.add(subscription);
  }

}
