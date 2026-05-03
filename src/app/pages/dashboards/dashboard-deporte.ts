import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { Unsubscribe } from 'firebase/firestore';
import {Router} from '@angular/router';

interface SportData {
  usuario: { nombre: string };
  actividades: Array<{ nombre: string; valor: string }>;
  deporte: {
    semana: Array<{ dia: string; valor: number }>;
    ejercicios: Array<{ nombre: string; valor: string }>;
  };
}

@Component({
  selector: 'app-dashboard-deporte',
  templateUrl: './Dashboard-Deporte.html',
  styleUrls: ['./Dashboard-Deporte.css']
})
export class DashboardDeporteComponent implements OnInit {
  private firestore = inject(Firestore);
  private unsubscribe?: Unsubscribe;

  weekData: Array<{ dia: string; valor: number }> = [];

  userName = '';
  moveText = '';
  moveCalories = '';
  exerciseText = '';
  exerciseCalories = '';
  standText = '';
  standCalories = '';

  trainText1 = ''; trainAmount1 = '';
  trainText2 = ''; trainAmount2 = '';
  trainText3 = ''; trainAmount3 = '';
  trainText4 = ''; trainAmount4 = '';
  trainText5 = ''; trainAmount5 = '';

  ngOnInit() {
    const docRef = doc(this.firestore, 'dashboard-data/deporte');

    this.unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data() as SportData;
      if (data) {
        this.updateData(data);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe?.();
  }

  private updateData(data: SportData) {
    this.userName = data.usuario.nombre;

    this.moveText = data.actividades[0]?.nombre || '';
    this.moveCalories = data.actividades[0]?.valor || '';
    this.exerciseText = data.actividades[1]?.nombre || '';
    this.exerciseCalories = data.actividades[1]?.valor || '';
    this.standText = data.actividades[2]?.nombre || '';
    this.standCalories = data.actividades[2]?.valor || '';

    this.weekData = data.deporte.semana || [];

    const exercises = data.deporte.ejercicios || [];
    for (let i = 1; i <= 5; i++) {
      const exercise = exercises[i-1];
      (this as any)[`trainText${i}`] = exercise?.nombre || '';
      (this as any)[`trainAmount${i}`] = exercise?.valor || '';
    }
    this.cdr.detectChanges();
  }
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}
  goToDieta() {
    this.router.navigate(['/dashboard-dieta']);
  }
  goToDeporte() {
    this.router.navigate(['/deportes']);
  }
}


