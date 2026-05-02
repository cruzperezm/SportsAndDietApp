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
  getFirestore,
  getDoc,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';

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

  getBioData() {
    const ref = collection(this.firestore, 'bio');
    return collectionData(ref, { idField: 'id' });
  }

  async addBioData(bio: Biodata) {
    const ref = collection(this.firestore, 'bio');
    return addDoc(ref, bio);
  }

  obtenerPlanPorId(id: string): Observable<any> {
    const bioDocRef = doc(this.firestore, `bio/${id}`);
    return from(getDoc(bioDocRef)).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        } else {
          return null;
        }
      })
    );
  }
}
