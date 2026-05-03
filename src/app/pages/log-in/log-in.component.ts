import { Component, inject, AfterViewInit, NgZone } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LoginComponent implements AfterViewInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private ngZone = inject(NgZone);
  private clientId = '109562227923-6ld8mglhkjmvltjphcghrqa5sp14pou9.apps.googleusercontent.com';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  isLoading = false;
  errorMessage = '';

  get emailControl() {
    return this.loginForm.get('email');
  }
  get passwordControl() {
    return this.loginForm.get('password');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadGoogleScript();
    }, 200);
  }

  loadGoogleScript(): void {
    if (typeof google === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.renderGoogleButton();
      };
      document.body.appendChild(script);
    } else {
      this.renderGoogleButton();
    }
  }

  renderGoogleButton(): void {
    const btnContainer = document.getElementById('google-btn');
    if (btnContainer && typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleGoogleResponse.bind(this),
      });
      google.accounts.id.renderButton(btnContainer, {
        type: 'standard',
        shape: 'rectangular',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        width: 250,
      });
    }
  }

  handleGoogleResponse(response: any) {
    this.isLoading = true;
    console.log('1. Token de Google recibido correctamente.');

    this.authService.googleAuth(response.credential).subscribe({
      next: (res: any) => {
        console.log('2. Respuesta de Firebase exitosa. Datos:', res);
        this.isLoading = false;

        this.ngZone.run(() => {
          if (res.needsOnboarding) {
            console.log('3. El usuario necesita Onboarding. Redirigiendo a /bio');
            this.router.navigate(['/bio']);
          } else {
            console.log('3. El usuario ya tiene datos. Redirigiendo a / (Dashboard)');
            this.router.navigate(['/']);
          }
        });
      },
      error: (err) => {
        console.error('ERROR en Autenticación de Google:', err);
        this.isLoading = false;
        this.ngZone.run(() => {
          this.errorMessage = 'No se pudo verificar el usuario en la base de datos.';
        });
      },
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Revisa el formato del correo y la contraseña.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    console.log('1. Intentando hacer login manual...');

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('2. Login exitoso. Datos:', res);
        this.isLoading = false;

        this.ngZone.run(() => {
          if (res.needsOnboarding) {
            console.log('3. Redirigiendo a /bio');
            this.router.navigate(['/bio']);
          } else {
            console.log('3. Redirigiendo a /');
            this.router.navigate(['/']);
          }
        });
      },
      error: (err) => {
        console.error('ERROR en Login manual:', err);
        this.isLoading = false;
        if (err.code === 'auth/invalid-credential') {
          this.errorMessage = 'Correo o contraseña incorrectos.';
        } else {
          this.errorMessage = 'Error al iniciar sesión.';
        }
      },
    });
  }
}
