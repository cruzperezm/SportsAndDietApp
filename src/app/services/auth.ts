import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  hasToken(): boolean {0
    // 1. Preguntamos: "¿Existe localStorage en este entorno?"
    if (typeof localStorage !== 'undefined') {
      // Si existe (estamos en el navegador), hacemos lo normal
      return !!localStorage.getItem('token');
      // (nota: si tu variable en el localStorage se llama distinto a 'token', pon tu nombre)
    }
    // 2. Si NO existe (estamos en el servidor oculto), asumimos que no hay sesión
    return false;
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.loggedIn.next(true);
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
}
