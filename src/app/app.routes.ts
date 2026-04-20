import { Routes } from '@angular/router';
import { DietasListComponent } from './components/dietas/dietas-list/dietas-list.component';

export const routes: Routes = [
  { path: 'dietas', component: DietasListComponent },
  // Atrapa cualquier ruta inventada y la manda a dietas
  { path: '**', redirectTo: 'dietas' },
];
