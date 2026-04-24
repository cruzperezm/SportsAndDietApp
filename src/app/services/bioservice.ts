import {
  Firestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  docData,
  collectionData,
  enableNetwork,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

interface Biodata {
  id?: number;
  genre: string;
  age: number;
  height: number;
  goal: string;
  act: string;
  cKg: number;
  dKg: number;
  nWeeks: number;
}

@Injectable({
  providedIn: 'root',
})
export class BioService {
  constructor(private firestore: Firestore) {
    enableNetwork(this.firestore)
      .then(() => console.log('🔥 network enabled'))
      .catch((err) => console.error('network error', err));
  }
  getBooks() {
    const ref = collection(this.firestore, 'bio');
    return collectionData(ref, { idField: 'id' });
  }

  async addBook(bio: Biodata) {
    console.log('firestore instance:', this.firestore);
    console.log('collection ref:', collection(this.firestore, 'bio'));

    console.log(firebase);

    const ref = collection(this.firestore, 'bio');

    try {
      const r = await addDoc(ref, bio);
      return console.log('OK:', r);
    } catch (e) {
      return console.error('ERROR:', e);
    }
  }
}
