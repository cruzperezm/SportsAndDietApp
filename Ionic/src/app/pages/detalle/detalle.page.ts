import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SqliteService } from '../../services/sqlite.service';
import { ReactiveFormsModule } from "@angular/forms";
import { addIcons } from 'ionicons';
import { heart, trash } from 'ionicons/icons';
import {
  IonBackButton, IonButton, IonButtons, IonContent, IonHeader,
  IonIcon, IonImg, IonTitle, IonToolbar, IonCard, IonCardContent // <-- Añadido
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonContent, IonHeader, IonToolbar, IonButtons, IonTitle, IonBackButton, IonImg, IonButton, IonIcon, IonCard, IonCardContent]
})
export class DetallePage implements OnInit {
  item: any = null;
  esFavorito: boolean = false;
  itemId: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private sqlite: SqliteService
  ) {
    addIcons({ heart, trash });
  }

  async ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id') || '';
    if (this.itemId) {
      await this.cargarDetalle();
      this.esFavorito = await this.sqlite.esFavorito(this.itemId);
    }
  }

  async cargarDetalle() {
    // 1. Buscamos en todas las Dietas buscando en sus arrays de "comidas"
    const dietasSnap = await getDocs(collection(this.firestore, 'dietas'));
    for (let doc of dietasSnap.docs) {
      const data = doc.data();
      if (data['plan']) {
        for (let dia of data['plan']) {
          if (dia.comidas) {
            const found = dia.comidas.find((c: any) => c.id === this.itemId);
            if (found) {
              this.item = { ...found, categoria: 'dieta' };
              return;
            }
          }
        }
      }
    }

    // 2. Si no estaba, buscamos en Deportes buscando en "ejercicios"
    const deportesSnap = await getDocs(collection(this.firestore, 'deportes'));
    for (let doc of deportesSnap.docs) {
      const data = doc.data();
      if (data['plan']) {
        for (let dia of data['plan']) {
          if (dia.ejercicios) {
            const found = dia.ejercicios.find((e: any) => e.id === this.itemId);
            if (found) {
              this.item = { ...found, categoria: 'entrenamiento' };
              return;
            }
          }
        }
      }
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
