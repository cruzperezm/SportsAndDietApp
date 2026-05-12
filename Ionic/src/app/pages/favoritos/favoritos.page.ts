import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SqliteService } from '../../services/sqlite.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class FavoritosPage implements OnInit {
  elementos: any[] = [];
  favoritosIds: string[] = [];

  // Variables para los filtros
  vistaActual: string = 'explorar'; // 'explorar' o 'favoritos'
  categoriaSeleccionada: string = 'dieta'; // 'dieta' o 'entrenamiento'

  constructor(
    private firestore: Firestore,
    private sqliteService: SqliteService
  ) {}

  async ngOnInit() { await this.cargarDatos(); }
  async ionViewWillEnter() { await this.cargarDatos(); }

  async cargarDatos() {
    try {
      this.favoritosIds = await this.sqliteService.getFavoritos();

      const dietasSnap = await getDocs(collection(this.firestore, 'dietas'));
      const listaDietas = dietasSnap.docs.map(doc => ({ id: doc.id, categoria: 'dieta', isFavorite: this.favoritosIds.includes(doc.id), ...doc.data() }));

      const deportesSnap = await getDocs(collection(this.firestore, 'deportes'));
      const listaDeportes = deportesSnap.docs.map(doc => ({ id: doc.id, categoria: 'entrenamiento', isFavorite: this.favoritosIds.includes(doc.id), ...doc.data() }));

      this.elementos = [...listaDietas, ...listaDeportes];
    } catch (e) {
      console.error('Error cargando datos:', e);
    }
  }

  async toggleFavorito(item: any, event: Event) {
    event.stopPropagation();
    if (item.isFavorite) {
      await this.sqliteService.quitarDeFavoritos(item.id);
    } else {
      await this.sqliteService.agregarAFavoritos(item.id);
    }
    item.isFavorite = !item.isFavorite;
  }
}
