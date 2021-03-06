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
    private router: Router) { }

  ngOnInit() {
    this.searchFor = new FormControl('');
    this.searchBy = 'firstname&company';
    this.foundCardsList = [];

  }

  search() {
    this.router.navigateByUrl(`business-cards/searchBy/${this.searchBy}/searchFor/${this.searchFor.value}`);
  }

  onSearchBy(event, choice) {
    event.preventDefault();

    switch (choice) {
      case 1:
        this.searchBy = 'firstname&company';
        break;
      case 2:
        this.searchBy = 'firstname';
        break;
      case 3:
        this.searchBy = 'company';
        break;
    }

  }

}
