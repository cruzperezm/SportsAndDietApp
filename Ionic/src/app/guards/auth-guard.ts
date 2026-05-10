// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return authState(this.auth).pipe(
      take(1),
      map(user => {
        if (user) {
          return true; // Usuario logeado, permite el acceso
        } else {
          this.router.navigate(['/login']); // No logeado, redirige al login
          return false;
        }
      })
    );
  }
}
