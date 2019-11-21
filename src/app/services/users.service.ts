import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private dbPath = 'users';
  users: Observable<User[]>;
  usersCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>(this.dbPath);
    this.users = this.usersCollection.valueChanges();
  }

  updateUser(id: string, update: User) {
    return this.usersCollection.doc(id).update(update);
  }

  addUser(newUser:User): Promise<void> {
    const id = this.afs.createId();
    newUser.id = id;
    return this.usersCollection.doc(id).set(Object.assign({}, newUser));
  }

}
