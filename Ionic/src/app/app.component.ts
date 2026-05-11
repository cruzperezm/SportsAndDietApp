import { Component } from '@angular/core';
import { Auth, signOut, authState } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router, RouterModule } from '@angular/router'; // Añadido RouterModule
import { IonicModule } from '@ionic/angular'; // Importación necesaria
import { CommonModule } from '@angular/common'; // Para usar *ngIf

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true, // REQUISITO PARA STANDALONE
  imports: [IonicModule, CommonModule, RouterModule] // REGISTRA LOS COMPONENTES AQUÍ
})
export class AppComponent {
  usuarioPerfil: any = null;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.escucharUsuario();
  }

  escucharUsuario() {
    authState(this.auth).subscribe(async (user) => {
      if (user) {
        // Recuperar info del perfil de Firebase DB (Requisito 1.10) [cite: 10]
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

  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']); // [cite: 50]
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }
}
