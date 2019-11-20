import { Component, OnInit } from '@angular/core';
import { BusinesscardsService } from '../services/businesscards.service';
import { Businesscard } from '../models/businesscard.model';
import { map, filter } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-search-business-cards',
  templateUrl: './search-business-cards.component.html',
  styleUrls: ['./search-business-cards.component.css']
})
export class SearchBusinessCardsComponent implements OnInit {
  foundBusinessCardsList: Businesscard[];
  tmpBusinessCards: Businesscard[];
  searchFor: string;
  searchBy: string;
  length: number;

  constructor(
    private businessCardsService: BusinesscardsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(url => {
      this.activatedRoute.paramMap.subscribe(param => {
        this.searchBy = param.get('searchBy');
        this.searchFor = param.get('searchFor');
        // console.log(`Search by: ${this.searchBy} || Search for: ${this.searchFor}`);
      });
      this.findBusinessCards();
    });

  }

  findBusinessCards() {
    this.businessCardsService.getBusinessCardsCollection().snapshotChanges()
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
  }


  findByFirstname() {
    for (const card of this.tmpBusinessCards) {
      if (this.searchFor.toLowerCase() === card.firstname.toLowerCase()) {
        this.foundBusinessCardsList.push(card);
      }
    }
    this.length = this.foundBusinessCardsList.length;
    console.log('searchByFIRSTNAME: ' + this.foundBusinessCardsList);

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
    console.log('searchByCOMPANY: ' + this.foundBusinessCardsList[0].company);
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
    console.log('searchBOTH: ' + this.foundBusinessCardsList);
  }

}
