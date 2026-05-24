// Ionic/src/app/pages/plan/plan.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class PlanPage implements OnInit {
  items: any[] = [];
  titulo: string = '';
  coleccion: string = '';
  idDoc: string = '';

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

  async ngOnInit() {
    this.idDoc = this.route.snapshot.paramMap.get('id')!;
    this.coleccion = this.route.snapshot.paramMap.get('coleccion')!;

    const docRef = doc(this.firestore, `${this.coleccion}/${this.idDoc}`);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data();
      this.titulo = data['nombre'] || data['id'];
      // Accedemos a plan[0].comidas o plan[0].ejercicios según la imagen
      if (this.coleccion === 'dietas') {
        this.items = data['plan'][0]['comidas'] || [];
      } else {
        this.items = data['plan'][0]['ejercicios'] || [];
      }
    }
  }
}
