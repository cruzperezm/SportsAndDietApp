import { Injectable } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  // Obtenemos los datos de un documento específico (ej. 'usuarios/id_usuario')
  getData(): Observable<any> {
    const userDocRef = doc(this.firestore, 'dashboard/deporte_data');
    return docData(userDocRef);
  }
}
