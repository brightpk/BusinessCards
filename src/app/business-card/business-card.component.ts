import { Component, OnInit, Input } from '@angular/core';
import { Businesscard } from '../models/businesscard.model';
import { BusinesscardsService } from '../services/businesscards.service';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { WebcamService } from '../services/webcam.service';
import { BusinessCardEditDialogComponent } from '../business-card-edit-dialog/business-card-edit-dialog.component';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {
  @Input() businessCards: Businesscard[];
  cardList: Businesscard[];


  selectedCard: Businesscard;
  // imageBase64: string;
  onPreview: boolean;
  // onWebcam: boolean;
  // closeForm: boolean;
  loading: boolean;

  constructor(
    private businessCardsService: BusinesscardsService,
    private webcamService: WebcamService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.selectedCard = new Businesscard();
    // this.imageBase64 = '';
    this.onPreview = false;
    // this.onWebcam = false;
    // this.closeForm = true;
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

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.delete(card);
        console.log(`Deleted ${card.firstname} ${card.lastname}`);
      }
    });
  }

  openEditDialog(card): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '480px';
    dialogConfig.data = card;

    const dialogRef = this.dialog.open(BusinessCardEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.update(res);
      }
    });
  }

}
