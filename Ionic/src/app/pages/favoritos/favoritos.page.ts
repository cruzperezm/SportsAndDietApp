import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; // Necesario para navegar al detalle
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SqliteService } from '../../services/sqlite.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class FavoritosPage implements OnInit {
  elementos: any[] = [];
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
      this.favoritosIds = await this.sqliteService.getFavoritos();
      const querySnapshot = await getDocs(collection(this.firestore, 'items'));
      this.elementos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        isFavorite: this.favoritosIds.includes(doc.id),
        ...doc.data()
      }));
    } catch (e) {
      console.error(e);
    }
  }
}
