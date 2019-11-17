import { Businesscard } from './../models/businesscard.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinesscardsService {
  private dbPath = 'businesscards';
  businessCards: Observable<Businesscard[]>;
  businessCardsCollection: AngularFirestoreCollection<Businesscard>;

  constructor(private afs: AngularFirestore) {
    this.businessCardsCollection = afs.collection<Businesscard>(this.dbPath);
    this.businessCards = this.businessCardsCollection.valueChanges();
  }

  addBusinessCard(newBusinessCard: Businesscard): Promise<void> {
    const id = this.afs.createId();
    newBusinessCard.id = id;
    return this.businessCardsCollection.doc(id).set(Object.assign({}, newBusinessCard));
  }

  updateBusinessCard(id: string, update: Businesscard): Promise<void> {
    return this.businessCardsCollection.doc(id).update(Object.assign({}, update));
  }

  deleteBusinessCard(id: string): Promise<void> {
    return this.businessCardsCollection.doc(id).delete();
  }

  getBusinessCardsCollection(): AngularFirestoreCollection<Businesscard> {
    return this.businessCardsCollection;
  }

}
