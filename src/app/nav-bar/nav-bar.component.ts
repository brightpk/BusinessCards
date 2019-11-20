import { Businesscard } from './../models/businesscard.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BusinesscardsService } from '../services/businesscards.service';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  foundCardsList: Businesscard[];
  businessCards: Businesscard[];
  searchFor: FormControl;
  searchBy: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private businessCardsService: BusinesscardsService) { }

  ngOnInit() {
    this.searchFor = new FormControl('');
    this.searchBy = 'firstname&company';
    this.foundCardsList = [];

    // this.businessCardsService.getBusinessCardsCollection().snapshotChanges()
    // .pipe(map(changes =>
    //   changes.map(c =>
    //     ({id: c.payload.doc.id, ...c.payload.doc.data()})
    //     )
    //   )
    // ).subscribe(card => {
    //   this.businessCards = card;
    // });
  }

  search() {
    this.router.navigateByUrl(`business-cards/searchBy/${this.searchBy}/searchFor/${this.searchFor.value}`);
  }

}
