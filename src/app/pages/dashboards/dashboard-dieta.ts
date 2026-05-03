import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

interface DietData {
  usuario: { nombre: string };
  dieta: {
    calorias_objetivo: string;
    calorias_totales: string;
    macros1: Array<{ nombre: string; valor: string }>;
    macros2: Array<{ nombre: string; valor: string; progreso: number }>;
    recetas: Array<{ nombre: string; valor: string }>;
  };
}

@Component({
  selector: 'app-dashboard-dieta',
  templateUrl: './dashboard-dieta.html',
  styleUrls: ['./dashboard-dieta.css']
})
export class DashboardDietaComponent implements OnInit {
  data$!: Observable<DietData>;

  userName = '';
  caloriesGoal = '';
  caloriesAmount = '';
  waterAmount = '';
  waterText = '';
  fiberAmount = '';
  fiberText = '';
  proteinAmount = '';
  proteinText = '';
  fatsAmount = '';
  fatsText = '';
  carbsAmount = '';
  carbsText = '';
  sodiumAmount = '';
  sodiumText = '';
  sugarAmount = '';
  sugarText = '';
  dietAmount1 = '';
  dietText1 = '';
  dietAmount2 = '';
  dietText2 = '';
  dietAmount3 = '';
  dietText3 = '';
  dietAmount4 = '';
  dietText4 = '';
  dietAmount5 = '';
  dietText5 = '';

  proteinProgress = 0;
  fatsProgress = 0;
  carbsProgress = 0;
  sodiumProgress = 0;
  sugarProgress = 0;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    // Fix: Handle undefined data properly
    this.data$ = this.firestore.collection('dashboard-data').doc<DietData>('dieta').valueChanges() as Observable<DietData>;

    this.data$.pipe(
      filter(data => !!data), // Only process non-null/undefined data
      map(data => {
        this.userName = data!.usuario.nombre;
        this.caloriesGoal = data!.dieta.calorias_objetivo;
        this.caloriesAmount = data!.dieta.calorias_totales;

        this.waterAmount = data!.dieta.macros1[0]?.valor || '';
        this.waterText = data!.dieta.macros1[0]?.nombre || '';
        this.fiberAmount = data!.dieta.macros1[1]?.valor || '';
        this.fiberText = data!.dieta.macros1[1]?.nombre || '';

        const m2 = data!.dieta.macros2;
        this.proteinAmount = m2[0]?.valor || '';
        this.proteinText = m2[0]?.nombre || '';
        this.fatsAmount = m2[1]?.valor || '';
        this.fatsText = m2[1]?.nombre || '';
        this.carbsAmount = m2[2]?.valor || '';
        this.carbsText = m2[2]?.nombre || '';
        this.sodiumAmount = m2[3]?.valor || '';
        this.sodiumText = m2[3]?.nombre || '';
        this.sugarAmount = m2[4]?.valor || '';
        this.sugarText = m2[4]?.nombre || '';

        this.proteinProgress = m2[0]?.progreso || 0;
        this.fatsProgress = m2[1]?.progreso || 0;
        this.carbsProgress = m2[2]?.progreso || 0;
        this.sodiumProgress = m2[3]?.progreso || 0;
        this.sugarProgress = m2[4]?.progreso || 0;

        const recetas = data!.dieta.recetas;
        this.dietAmount1 = recetas[0]?.valor || '';
        this.dietText1 = recetas[0]?.nombre || '';
        this.dietAmount2 = recetas[1]?.valor || '';
        this.dietText2 = recetas[1]?.nombre || '';
        this.dietAmount3 = recetas[2]?.valor || '';
        this.dietText3 = recetas[2]?.nombre || '';
        this.dietAmount4 = recetas[3]?.valor || '';
        this.dietText4 = recetas[3]?.nombre || '';
        this.dietAmount5 = recetas[4]?.valor || '';
        this.dietText5 = recetas[4]?.nombre || '';
      })
    ).subscribe();
  }
}
