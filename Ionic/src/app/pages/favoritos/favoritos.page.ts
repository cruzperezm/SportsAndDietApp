import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SqliteService } from '../../services/sqlite.service';

export interface MiElemento {
  id: string;
  isFavorite: boolean;
  titulo?: string;
  nombre?: string;
  descripcion_corta?: string;
  imagen?: string;
}

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
})
export class FavoritosPage implements OnInit {
  elementos: MiElemento[] = [];
  favoritosIds: string[] = [];

  constructor(
    private firestore: Firestore,
    private sqliteService: SqliteService
  ) {}

  async ngOnInit() {
    await this.cargarDatos();
  }

  async ionViewWillEnter() {
    await this.cargarDatos();
  }

  async cargarDatos() {
    try {
      // 1. Obtener favoritos locales
      this.favoritosIds = await this.sqliteService.getFavoritos();

      // 2. Obtener datos de Firebase
      // IMPORTANTE: Cambia 'items' por el nombre real de tu colección en Firestore
      const firestoreCollection = collection(this.firestore, 'items');
      const querySnapshot = await getDocs(firestoreCollection);

      this.elementos = querySnapshot.docs.map((doc: any) => {
        const data = doc.data() as any;
        const id = doc.id;
        const isFavorite = this.favoritosIds.includes(id);

        return {
          id,
          isFavorite,
          titulo: data.titulo,
          nombre: data.nombre,
          descripcion_corta: data.descripcion_corta,
          imagen: data.imagen
        };
      });
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  }
}
