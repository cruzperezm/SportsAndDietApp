import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { Unsubscribe } from 'firebase/firestore';

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
  templateUrl: './Dashboard-Dieta.html',
  styleUrls: ['./Dashboard-Dieta.css']
})
export class DashboardDietaComponent implements OnInit, OnDestroy {
  private firestore = inject(Firestore);
  private unsubscribe?: Unsubscribe;

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

  ngOnInit() {
    const docRef = doc(this.firestore, 'dashboard-data/dieta');

    this.unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data() as DietData;
      if (data) {
        this.updateData(data);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe?.();
  }

  private updateData(data: DietData) {
    this.userName = data.usuario.nombre;
    this.caloriesGoal = data.dieta.calorias_objetivo;
    this.caloriesAmount = data.dieta.calorias_totales;

    this.waterAmount = data.dieta.macros1[0]?.valor || '';
    this.waterText = data.dieta.macros1[0]?.nombre || '';
    this.fiberAmount = data.dieta.macros1[1]?.valor || '';
    this.fiberText = data.dieta.macros1[1]?.nombre || '';

    const m2 = data.dieta.macros2;
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

    const recetas = data.dieta.recetas;
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
  }
}
