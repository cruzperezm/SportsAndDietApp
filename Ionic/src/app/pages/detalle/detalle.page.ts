// src/app/pages/detalle/detalle.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf
import { IonicModule } from '@ionic/angular'; // Para componentes ion-*
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { SqliteService } from '../../services/sqlite.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true, // REQUERIDO para usar 'imports'
  imports: [CommonModule, IonicModule] // Soluciona los errores de "out of scope"
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
    // IMPORTANTE: Asegúrate de que 'items' sea el nombre real de tu colección
    const docRef = doc(this.firestore, `items/${this.itemId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.item = docSnap.data();
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
