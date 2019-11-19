import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { BusinesscardsService } from '../services/businesscards.service';
import { Businesscard } from '../models/businesscard.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-cards',
  templateUrl: './business-cards.component.html',
  styleUrls: ['./business-cards.component.css']
})
export class BusinessCardsComponent implements OnInit {
  businessCards: Businesscard[];

  constructor(private businessCardsService: BusinesscardsService, private router: Router) { }

  ngOnInit() {
    this.getBusinessCards();
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

  onClikcAdd() {
    this.router.navigate(['/new-business-card']);
  }

}
