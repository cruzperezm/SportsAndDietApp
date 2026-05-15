import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SqliteService } from '../../services/sqlite.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons'
import {
  IonAvatar,
  IonButtons, IonContent,
  IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList,
  IonMenuButton,
  IonSegment,
  IonSegmentButton, IonSpinner,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";


@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonHeader, IonToolbar,
    IonButtons, IonMenuButton, IonTitle, IonSegmentButton, IonSegment, IonContent,
    IonList, IonSpinner, IonAvatar, IonItem, IonLabel, IonImg, IonIcon]
})
export class FavoritosPage implements OnInit {
  elementos: any[] = [];
  elementosFiltrados: any[] = [];
  favoritosIds: string[] = [];

  seccionActual: string = 'dietas';
  categoriaFavoritos: string = 'dieta';
  cargando: boolean = true;

  constructor(
    private firestore: Firestore,
    private sqliteService: SqliteService,
    private route: ActivatedRoute
  ) {
    addIcons({heart, heartOutline});
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      this.seccionActual = params['seccion'] || 'dietas';
      await this.cargarDatos();
    });
  }

  async ionViewWillEnter() { await this.cargarDatos(); }

  async cargarDatos() {
    this.cargando = true;
    try {
      this.favoritosIds = await this.sqliteService.getFavoritos();

      const dietasSnap = await getDocs(collection(this.firestore, 'dietas'));
      const listaDietas = dietasSnap.docs.map(doc => ({
        id: doc.id, categoria: 'dieta', isFavorite: this.favoritosIds.includes(doc.id), ...doc.data()
      }));

      const deportesSnap = await getDocs(collection(this.firestore, 'deportes'));
      const listaDeportes = deportesSnap.docs.map(doc => ({
        id: doc.id, categoria: 'entrenamiento', isFavorite: this.favoritosIds.includes(doc.id), ...doc.data()
      }));

      this.elementos = [...listaDietas, ...listaDeportes];
      this.aplicarFiltro();
    } catch (e) {
      console.error('Error:', e);
    } finally {
      this.cargando = false;
    }
  }

  aplicarFiltro() {
    if (this.seccionActual === 'dietas') {
      this.elementosFiltrados = this.elementos.filter(item => item.categoria === 'dieta');
    } else if (this.seccionActual === 'deportes') {
      this.elementosFiltrados = this.elementos.filter(item => item.categoria === 'entrenamiento');
    } else if (this.seccionActual === 'favoritos') {
      this.elementosFiltrados = this.elementos.filter(item => item.isFavorite && item.categoria === this.categoriaFavoritos);
    }
  }

  cambiarTabFavoritos(event: any) {
    this.categoriaFavoritos = event.detail.value;
    this.aplicarFiltro();
  }

  async toggleFavorito(item: any, event: Event) {
    event.stopPropagation();
    if (item.isFavorite) {
      await this.sqliteService.quitarDeFavoritos(item.id);
    } else {
      await this.sqliteService.agregarAFavoritos(item.id);
    }
    item.isFavorite = !item.isFavorite;
    if (this.seccionActual === 'favoritos') this.aplicarFiltro();
  }

  getTitulo() {
    if (this.seccionActual === 'dietas') return 'Nuestras Dietas';
    if (this.seccionActual === 'deportes') return 'Entrenamientos';
    return 'Mis Favoritos';
  }
}
