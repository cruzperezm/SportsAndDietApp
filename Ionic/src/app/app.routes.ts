import { Routes } from '@angular/router';
import {AuthGuard} from "@angular/fire/auth-guard";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos.page').then(m => m.FavoritosPage),
    canActivate: [AuthGuard] // <-- Añade esto
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favoritos/favoritos.page').then( m => m.FavoritosPage)
  },  {
    path: 'detalle',
    loadComponent: () => import('./pages/detalle/detalle.page').then( m => m.DetallePage)
  }


];
