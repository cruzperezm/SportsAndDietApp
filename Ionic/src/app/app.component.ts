import { Component } from '@angular/core';
import {Auth, authState, signOut} from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true, // ESTO ES VITAL
  imports: [IonicModule, CommonModule, RouterModule]
})
export class AppComponent {
  usuarioPerfil: any = null;

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {
    this.escucharUsuario();
  }

  escucharUsuario() {
    authState(this.auth).subscribe(async (user) => {
      if (user) {
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
