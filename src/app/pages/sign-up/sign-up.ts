import { Component, inject, AfterViewInit, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';

declare var google: any;

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.css'],
})
export class SignupComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  // USA EL MISMO ID QUE EN LOGIN[cite: 16]
  private clientId = '109562227923-6ld8mglhkjmvltjphcghrqa5sp14pou9.apps.googleusercontent.com';

  signUpForm: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: (g: FormGroup) =>
        g.get('password')?.value === g.get('confirmPassword')?.value ? null : { mismatch: true },
    },
  );

  isLoading = false;
  errorMessage = '';

  get emailControl() {
    return this.signUpForm.get('email');
  }
  get userControl() {
    return this.signUpForm.get('username');
  }
  get passwordControl() {
    return this.signUpForm.get('password');
  }
  get confirmControl() {
    return this.signUpForm.get('confirmPassword');
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.loadGoogleScript(), 300);
    }
  }

  loadGoogleScript(): void {
    if (typeof google === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => this.renderGoogleButton();
      document.body.appendChild(script);
    } else {
      this.renderGoogleButton();
    }
  }

  renderGoogleButton(): void {
    const btnContainer = document.getElementById('google-btn');
    if (btnContainer && typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleGoogleResponse.bind(this),
      });
      google.accounts.id.renderButton(btnContainer, {
        type: 'standard',
        shape: 'rectangular',
        theme: 'outline',
        size: 'large',
        text: 'signup_with',
        width: 250,
      });
    }
  }

  handleGoogleResponse(response: any) {
    this.isLoading = true;
    this.authService.googleAuth(response.credential).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.ngZone.run(() => {
          if (res.needsOnboarding) void this.router.navigate(['/bio']);
          else void this.router.navigate(['/']);
        });
      },
      error: (err: any) => {
        this.isLoading = false;
        this.ngZone.run(() => (this.errorMessage = 'Fallo en la autenticación con Google.'));
      },
    });
  }

  signup() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.signUpForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.ngZone.run(() => void this.router.navigate(['/bio']));
      },
      error: (err: any) => {
        this.isLoading = false;

        // Aquí está la magia de la redirección y el aviso seguro
        if (err.code === 'auth/email-already-in-use') {
          this.errorMessage =
            'Este correo ya está registrado (posiblemente con Google). Por favor, ve a "Inicia sesión" para entrar.';
        } else {
          this.errorMessage = 'Error al conectar con la base de datos. Inténtalo de nuevo.';
        }
      },
    });
  }
}
