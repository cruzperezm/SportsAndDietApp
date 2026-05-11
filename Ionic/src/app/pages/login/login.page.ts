// src/app/pages/login/login.page.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializamos el formulario solo con email y password
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      try {
        await this.authService.loginUsuario(email, password);
        console.log('Login exitoso');
        // Redirigir a la pantalla de favoritos/lista tras un login exitoso
        this.router.navigate(['/favoritos']);
      } catch (error: any) {
        this.errorMessage = 'Credenciales incorrectas o error en el servidor.';
      }
    } else {
      this.errorMessage = 'Por favor, introduce un email y contraseña válidos.';
    }
  }
}
