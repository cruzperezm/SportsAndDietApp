import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonHeader,
  IonImg,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {doc, getDoc, Firestore} from "@angular/fire/firestore";
import {ActivatedRoute} from "@angular/router";
import {SqliteService} from "../../services/sqlite.service";

@Component({
  selector: 'app-detalle-plan',
  templateUrl: './detalle-plan.page.html',
  styleUrls: ['./detalle-plan.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonCard, IonCardContent, IonChip]
})

export class DetallePlanPage implements OnInit {
  info: any = null;
  esDieta: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private sqlite: SqliteService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    const col = this.route.snapshot.paramMap.get('coleccion')!;
    const idx = parseInt(this.route.snapshot.paramMap.get('index')!);
    this.esDieta = col === 'dietas';

    const docRef = doc(this.firestore, `${col}/${id}`);
    const snap = await getDoc(docRef);
    const data = snap.data();

    // Extraemos el sub-item específico del array según el índice
    this.info = col === 'dietas' ? data!['plan'][0]['comidas'][idx] : data!['plan'][0]['ejercicios'][idx];
  }
}
