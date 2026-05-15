import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonText,
  IonSpinner, IonButton
} from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonText, IonSpinner, IonButton]
})
export class RegistroPage implements OnInit {
  registroForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false; // Variable de estado de carga

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.registroForm.valid) {
      this.isLoading = true; // Iniciar carga
      this.errorMessage = '';
      const { email, password, nombre, apellidos, imagen } = this.registroForm.value;

      try {
        await this.authService.registrarUsuario(email, password, { nombre, apellidos, imagen });
        this.router.navigate(['/favoritos']);
      } catch (error: any) {
        this.errorMessage = 'Error al registrar: ' + error.message;
      } finally {
        this.isLoading = false; // Finalizar carga
      }
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
