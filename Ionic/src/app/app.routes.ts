import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Si las páginas son Standalone, usa loadComponent:
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
  { path: 'registro', loadComponent: () => import('./pages/registro/registro.page').then(m => m.RegistroPage) },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favoritos/favoritos.page').then(m => m.FavoritosPage),
    canActivate: [AuthGuard] // Requisito de seguridad del Sprint [cite: 19, 100]
  },
  {
    path: 'detalle/:id',
    loadComponent: () => import('./pages/detalle/detalle.page').then(m => m.DetallePage),
    canActivate: [AuthGuard]
  }
];
