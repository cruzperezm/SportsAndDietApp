import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  // CAMBIO CLAVE: Usamos loadComponent
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
  { path: 'registro', loadComponent: () => import('./pages/registro/registro.page').then(m => m.RegistroPage) },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favoritos/favoritos.page').then(m => m.FavoritosPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'detalle/:id',
    loadComponent: () => import('./pages/detalle/detalle.page').then(m => m.DetallePage),
    canActivate: [AuthGuard]
  },
  {path: '',
    redirectTo: 'home',
    pathMatch: 'full',}
];
