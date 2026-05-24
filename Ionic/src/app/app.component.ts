import { Component } from '@angular/core';
import { Auth, signOut, authState } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router, RouterModule } from '@angular/router';
import {NgIf} from "@angular/common";
import {
  IonApp, IonAvatar, IonContent,
  IonHeader, IonIcon, IonItem, IonLabel, IonList,
  IonMenu, IonMenuToggle, IonRouterLink,
  IonRouterOutlet, IonSplitPane, IonTitle,
  IonToolbar, IonAccordionGroup, IonAccordion // <-- AÑADIDOS ESTOS DOS
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import { heartOutline, barbellOutline, logInOutline, restaurantOutline, logOutOutline} from "ionicons/icons";

// Asegúrate de incluirlos en la etiqueta @Component:
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonSplitPane, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, NgIf, IonRouterLink, RouterModule] // <-- AÑADIDOS AQUÍ TAMBIÉN
})
export class AppComponent {
  usuarioPerfil: any = null;

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {
    this.escucharUsuario();
    addIcons({heartOutline, barbellOutline, logInOutline, restaurantOutline, logOutOutline});
  }

  escucharUsuario() {
    authState(this.auth).subscribe(async (user) => {
      if (user) {
        const docRef = doc(this.firestore, `users/${user.uid}`);
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
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}
