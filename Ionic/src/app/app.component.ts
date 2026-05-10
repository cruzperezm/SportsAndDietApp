import { Component } from '@angular/core';
import { Auth, signOut, authState } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // Información asociada con el perfil del usuario a visualizar en el menú [cite: 9, 10]
  usuarioPerfil: any = null;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.escucharUsuario();
  }

  // Escucha si hay un usuario logeado para cargar su información de Firebase [cite: 6, 12]
  escucharUsuario() {
    authState(this.auth).subscribe(async (user) => {
      if (user) {
        // Obtenemos la información extra (nombre, apellidos, imagen) de Firestore [cite: 10, 78]
        const docRef = doc(this.firestore, `usuarios/${user.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.usuarioPerfil = docSnap.data();
        }
      } else {
        this.usuarioPerfil = null;
      }
    });
  }

  // Lógica para cerrar la sesión del usuario [cite: 50, 60]
  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }
}
