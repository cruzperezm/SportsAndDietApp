// src/app/pages/detalle/detalle.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { SqliteService } from '../../services/sqlite.service';
import {ReactiveFormsModule} from "@angular/forms";
import {
  IonBackButton, IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon,
  IonImg,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true, // Debe ser standalone
  imports: [CommonModule, ReactiveFormsModule, IonContent, IonHeader, IonToolbar, IonButtons, IonTitle, IonBackButton, IonImg, IonButton, IonIcon] // Esto activa los botones y el diseño
})

export class DetallePage implements OnInit {
  item: any = null;
  esFavorito: boolean = false;
  itemId: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private sqlite: SqliteService
  ) {}

  async ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id') || '';
    if (this.itemId) {
      await this.cargarDetalle();
      this.esFavorito = await this.sqlite.esFavorito(this.itemId);
    }
  }

  async cargarDetalle() {
    // Primero buscamos en dietas
    let docRef = doc(this.firestore, `dietas/${this.itemId}`);
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.item = docSnap.data();
      return; // Si lo encuentra, terminamos aquí
    }

    // Si no estaba en dietas, buscamos en deportes
    docRef = doc(this.firestore, `deportes/${this.itemId}`);
    docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.item = docSnap.data();
    } else {
      console.error("El elemento no existe en ninguna colección");
    }
  }

  async toggleFavorito() {
    if (this.esFavorito) {
      await this.sqlite.quitarDeFavoritos(this.itemId);
    } else {
      await this.sqlite.agregarAFavoritos(this.itemId);
    }
    this.esFavorito = !this.esFavorito;
  }
}
