import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SqliteService } from '../../services/sqlite.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline, arrowBackOutline } from 'ionicons/icons';
import {
  IonAvatar, IonButtons, IonContent, IonHeader, IonIcon, IonImg,
  IonItem, IonLabel, IonList, IonMenuButton, IonSegment, IonButton,
  IonSegmentButton, IonSpinner, IonTitle, IonToolbar
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonHeader, IonToolbar,
    IonButtons, IonMenuButton, IonTitle, IonSegmentButton, IonSegment, IonContent,
    IonList, IonSpinner, IonAvatar, IonItem, IonLabel, IonImg, IonIcon, IonButton]
})
export class FavoritosPage implements OnInit {
  // Datos estructurados
  tiposDietas: any[] = [];
  tiposDeportes: any[] = [];
  todosLosItems: any[] = []; // Recetas y ejercicios extraídos

  // Variables para la vista HTML
  tiposMostrados: any[] = [];
  elementosFiltrados: any[] = [];

  favoritosIds: string[] = [];
  seccionActual: string = 'dietas';
  categoriaFavoritos: string = 'dieta';
  cargando: boolean = true;

  // Estado de navegación: 'tipos' (Categorías) -> 'elementos' (Recetas/Ejercicios)
  vistaActual: 'tipos' | 'elementos' = 'tipos';
  tipoSeleccionado: string = '';

  constructor(
    private firestore: Firestore,
    private sqliteService: SqliteService,
    private route: ActivatedRoute
  ) {
    addIcons({ heart, heartOutline, arrowBackOutline });
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      this.seccionActual = params['seccion'] || 'dietas';
      // Si entra a favoritos, va directo a la vista de elementos
      this.vistaActual = this.seccionActual === 'favoritos' ? 'elementos' : 'tipos';
      this.tipoSeleccionado = '';
      await this.cargarDatos();
    });
  }

  async ionViewWillEnter() { await this.cargarDatos(); }

  async cargarDatos() {
    this.cargando = true;
    try {
      this.favoritosIds = await this.sqliteService.getFavoritos();
      this.todosLosItems = []; // Limpiamos caché

      // 1. CARGAR DIETAS
      const dietasSnap = await getDocs(collection(this.firestore, 'dietas'));
      this.tiposDietas = dietasSnap.docs.map(doc => {
        const data = doc.data();
        // Aplanar array plan -> comidas
        if (data['plan']) {
          data['plan'].forEach((dia: any) => {
            if (dia.comidas) {
              dia.comidas.forEach((comida: any) => {
                this.todosLosItems.push({
                  ...comida,
                  categoria: 'dieta',
                  tipoPadre: doc.id,
                  isFavorite: this.favoritosIds.includes(comida.id)
                });
              });
            }
          });
        }
        return { idDoc: doc.id, nombreTipo: doc.id, imagen: data['imagen'] };
      });

      // 2. CARGAR DEPORTES
      const deportesSnap = await getDocs(collection(this.firestore, 'deportes'));
      this.tiposDeportes = deportesSnap.docs.map(doc => {
        const data = doc.data();
        // Aplanar array plan -> ejercicios
        if (data['plan']) {
          data['plan'].forEach((dia: any) => {
            if (dia.ejercicios) {
              dia.ejercicios.forEach((ejercicio: any) => {
                this.todosLosItems.push({
                  ...ejercicio,
                  categoria: 'entrenamiento',
                  tipoPadre: doc.id,
                  isFavorite: this.favoritosIds.includes(ejercicio.id)
                });
              });
            }
          });
        }
        return { idDoc: doc.id, nombreTipo: doc.id, imagen: data['imagen'] };
      });

      this.aplicarFiltro();
    } catch (e) {
      console.error('Error:', e);
    } finally {
      this.cargando = false;
    }
  }

  aplicarFiltro() {
    if (this.seccionActual === 'favoritos') {
      this.elementosFiltrados = this.todosLosItems.filter(item =>
        item.isFavorite && item.categoria === this.categoriaFavoritos
      );
    } else {
      const cat = this.seccionActual === 'dietas' ? 'dieta' : 'entrenamiento';

      if (this.vistaActual === 'tipos') {
        this.tiposMostrados = cat === 'dieta' ? this.tiposDietas : this.tiposDeportes;
      } else {
        // Mostrar recetas/ejercicios del tipo seleccionado
        this.elementosFiltrados = this.todosLosItems.filter(item =>
          item.categoria === cat && item.tipoPadre === this.tipoSeleccionado
        );
      }
    }
  }

  seleccionarTipo(idDoc: string) {
    this.tipoSeleccionado = idDoc;
    this.vistaActual = 'elementos';
    this.aplicarFiltro();
  }

  volverATipos() {
    this.vistaActual = 'tipos';
    this.tipoSeleccionado = '';
    this.aplicarFiltro();
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
    if (this.seccionActual === 'dietas') return 'Dietas';
    if (this.seccionActual === 'deportes') return 'Entrenamientos';
    return 'Mis Favoritos';
  }
}
