import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusinesscardsService } from '../services/businesscards.service';
import { Businesscard } from '../models/businesscard.model';
import { map, filter } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-business-cards',
  templateUrl: './search-business-cards.component.html',
  styleUrls: ['./search-business-cards.component.css']
})
export class SearchBusinessCardsComponent implements OnInit, OnDestroy {
  foundBusinessCardsList: Businesscard[];
  tmpBusinessCards: Businesscard[];
  searchFor: string;
  searchBy: string;
  length: number;
  subscription: Subscription;

  constructor(
    private businessCardsService: BusinesscardsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.subscription = new Subscription();

    const subscription = this.activatedRoute.url.subscribe(url => {
      this.activatedRoute.paramMap.subscribe(param => {
        this.searchBy = param.get('searchBy');
        this.searchFor = param.get('searchFor');
        // console.log(`Search by: ${this.searchBy} || Search for: ${this.searchFor}`);
      });
      this.findBusinessCards();
    });

    this.subscription.add(subscription);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('ngOnDestroy search-cards');
  }

  findBusinessCards() {
    const subscription = this.businessCardsService.getBusinessCardsCollection().snapshotChanges()
    .pipe(map(changes =>
      changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(card => {
      this.tmpBusinessCards = card;
      if (this.searchFor === '' || (this.searchFor === ' ')) {
        this.foundBusinessCardsList = [];
      } else if (this.searchBy === 'firstname') {
        this.foundBusinessCardsList = [];
        this.findByFirstname();
      } else if (this.searchBy === 'company') {
        this.foundBusinessCardsList = [];
        this.findByCompany();
      } else if (this.searchBy === 'firstname&company') {
        this.foundBusinessCardsList = [];
        this.findByFirstnameAndCompany();
      }
    });

    this.subscription.add(subscription);
  }


  findByFirstname() {
    for (const card of this.tmpBusinessCards) {
      if (this.searchFor.toLowerCase() === card.firstname.toLowerCase()) {
        this.foundBusinessCardsList.push(card);
      }
    }
    this.length = this.foundBusinessCardsList.length;

  }

  findByCompany() {
    for (const card of this.tmpBusinessCards) {

      if (card.company !== undefined) {
        if (card.company.toLowerCase().includes(this.searchFor.toLowerCase())) {
          this.foundBusinessCardsList.push(card);
        }
      }
    }
    this.length = this.foundBusinessCardsList.length;
  }

  findByFirstnameAndCompany() {
    for (const card of this.tmpBusinessCards) {

      if (this.searchFor.toLowerCase() === card.firstname.toLowerCase()) {
        this.foundBusinessCardsList.push(card);
      }

      if (card.company !== undefined ) {
        if (card.company.toLowerCase().includes(this.searchFor.toLowerCase())) {
          this.foundBusinessCardsList.push(card);
        }
      }
    }
    this.length = this.foundBusinessCardsList.length;
  }

}
