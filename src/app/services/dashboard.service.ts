import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  getData(): Observable<any> {
    const docRef = doc(this.firestore, 'dashboard/deporte_data');

    return from(getDoc(docRef)).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          console.warn('AVISO: El documento "deporte_data" no existe en Firebase.');
          return null;
        }
      }),
    );
  }
}
