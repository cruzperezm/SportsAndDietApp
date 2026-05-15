import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel, IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonText, IonButton, IonSpinner]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false; // Variable para controlar el estado de carga

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true; // Activar carga al iniciar la solicitud
      this.errorMessage = '';
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.loginUsuario(email, password);
        this.router.navigate(['/favoritos']); // Navega al éxito
      } catch (error: any) {
        this.errorMessage = 'Email o contraseña incorrectos.';
      } finally {
        this.isLoading = false; // Desactivar carga al finalizar (éxito o error)
      }
    }
  }
}
