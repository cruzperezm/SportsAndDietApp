import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {IonHeader} from "@ionic/angular/standalone";
import {IonicModule} from "@ionic/angular";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true, // Debe ser standalone
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule] // Esto activa los botones y el diseño
})

export class RegistroPage implements OnInit {
  registroForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializamos el formulario con los campos requeridos [cite: 74, 75, 76]
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      imagen: ['', Validators.required] // Por ahora pediremos una URL de imagen
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.registroForm.valid) {
      const { email, password, nombre, apellidos, imagen } = this.registroForm.value;

      try {
        // Llamamos al servicio para registrar [cite: 77, 78]
        await this.authService.registrarUsuario(email, password, { nombre, apellidos, imagen });

        console.log('Usuario registrado con éxito');
        // Redirigir a la pantalla de favoritos/lista tras registro exitoso
        this.router.navigate(['/favoritos']);

      } catch (error: any) {
        this.errorMessage = 'Error al registrar: ' + error.message;
      }
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
