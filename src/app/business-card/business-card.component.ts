import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Businesscard } from '../models/businesscard.model';
import { BusinesscardsService } from '../services/businesscards.service';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { WebcamService } from '../services/webcam.service';
import { BusinessCardEditDialogComponent } from '../business-card-edit-dialog/business-card-edit-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit, OnDestroy {
  @Input() businessCards: Businesscard[];
  cardList: Businesscard[];
  subscription: Subscription;

  selectedCard: Businesscard;
  onPreview: boolean;
  loading: boolean;

  constructor(
    private businessCardsService: BusinesscardsService,
    private webcamService: WebcamService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.subscription = new Subscription();
    this.selectedCard = new Businesscard();
    this.onPreview = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('ngOnDestroy business card');
  }


  openImage(card) {
    console.log(card.firstname);
    if (this.selectedCard.image === card.image) {
      this.onPreview = false;
      this.selectedCard.image = '';
    } else {
      this.selectedCard.image = card.image;
      this.onPreview = true;
    }
  }

  openSnackBar(msg: string, action: string, time?: number) {
    this.snackBar.open(msg, action, { duration: time });
  }

  isLoading(loading) {
    this.loading = loading;
  }

  update(card) {
    this.loading = true;
    this.businessCardsService.updateBusinessCard(card.id, card)
    .then(res => {
      console.log('Successfully UPDATED!');
      this.loading = false;
      this.openSnackBar('Successfully UPDATED!', 'x', 5000 );
    })
    .catch(err => {
      console.log('Fail to UPDATE a particular business card :(');
      this.loading = false;
      this.openSnackBar('Fail to UPDATE', 'x', 5000 );
    });

    this.loading = false;
  }

  delete(card) {
    this.businessCardsService.deleteBusinessCard(card.id);
  }

  openDeleteDialog(card): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      width: '350px',
      data: {
        firstname: card.firstname,
        lastname: card.lastname,
        text: 'Do you confirm the deletion of this data?'
       }
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    const subscription = dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.delete(card);
        console.log(`Deleted ${card.firstname} ${card.lastname}`);
      }
    });

    this.subscription.add(subscription);
  }

  openEditDialog(card): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '480px';
    dialogConfig.data = card;

    const dialogRef = this.dialog.open(BusinessCardEditDialogComponent, dialogConfig);

    const subscription = dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.update(res);
      }
    });

    this.subscription.add(subscription);
  }

}
