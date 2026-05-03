import { Routes } from '@angular/router';
//import { Login } from './pages/login/login';
//import { Signup } from './pages/signup/signup';
import { Bio } from './pages/biodata/bio';
import { DietasInicioComponent } from './pages/dietas/dietas-inicio/dietas-inicio';
import { DietasPlanComponent } from './pages/dietas/dietas-plan/dietas-plan';
import { DietasDetalleComponent } from './pages/dietas/dietas-detalle/dietas-detalle';
import { HomeComponent } from './pages/home/home';
import { DeportesInicioComponent } from './pages/deportes/deportes-inicio/deportes-inicio';
import { DeportesPlanComponent } from './pages/deportes/deportes-plan/deportes-plan';
import { DeportesDetalleComponent } from './pages/deportes/deportes-detalle/deportes-detalle';
import { DashboardDeporteComponent} from './pages/dashboards/dashboard-deporte';
import { DashboardDietaComponent} from './pages/dashboards/dashboard-dieta';

export const routes: Routes = [
  //{ path: 'login', component: Login, title: 'SPORTS&DIET · Log In' },
  //{ path: 'signup', component: Signup, title: 'SPORTS&DIET · Sign Up' },
  { path: 'bio', component: Bio, title: 'SPORTS&DIET · Bio Data' },
  { path: 'dietas', component: DietasInicioComponent, title: 'SPORTS&DIET · Dietas' },
  { path: 'dietas/plan/:id', component: DietasPlanComponent, title: 'SPORTS&DIET · Plan' },
  { path: 'dietas/receta/:id', component: DietasDetalleComponent, title: 'SPORTS&DIET · Receta' },
  { path: 'home', component: HomeComponent, title: 'SPORTS&DIET · Home' },
  { path: 'deportes', component: DeportesInicioComponent, title: 'SPORTS&DIET · Deportes' },
  { path: 'deportes/plan/:id', component: DeportesPlanComponent, title: 'SPORTS&DIET · Entrenamientos', },
  { path: 'deportes/ejercicio/:id', component: DeportesDetalleComponent, title: 'SPORTS&DIET · Ejercicio', },
  { path: 'dashboard-deporte', component: DashboardDeporteComponent, title: 'SPORTS&DIET · Dashboard Deporte' },
  { path: 'dashboard-dieta', component: DashboardDietaComponent, title: 'SPORTS&DIET · Dashboard Dieta' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
