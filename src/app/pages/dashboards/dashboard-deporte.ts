import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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
  templateUrl: './dashboard-deporte.component.html',
  styleUrls: ['./dashboard-deporte.component.css']
})
export class DashboardDeporteComponent implements OnInit {
  data$!: Observable<SportData>;
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

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    // Fix: Handle undefined data properly
    this.data$ = this.firestore.collection('dashboard-data').doc<SportData>('deporte').valueChanges() as Observable<SportData>;

    this.data$.pipe(
      filter(data => !!data), // Only process non-null/undefined data
      map(data => {
        this.userName = data!.usuario.nombre;

        this.moveText = data!.actividades[0]?.nombre || '';
        this.moveCalories = data!.actividades[0]?.valor || '';
        this.exerciseText = data!.actividades[1]?.nombre || '';
        this.exerciseCalories = data!.actividades[1]?.valor || '';
        this.standText = data!.actividades[2]?.nombre || '';
        this.standCalories = data!.actividades[2]?.valor || '';

        this.weekData = data!.deporte.semana || [];

        const exercises = data!.deporte.ejercicios || [];
        for (let i = 1; i <= 5; i++) {
          const exercise = exercises[i-1];
          (this as any)[`trainText${i}`] = exercise?.nombre || '';
          (this as any)[`trainAmount${i}`] = exercise?.valor || '';
        }
      })
    ).subscribe();
  }
}
