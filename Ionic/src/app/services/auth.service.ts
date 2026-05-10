// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import {doc, Firestore, setDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) { }

  // Función para registrar usuario y guardar su perfil
  async registrarUsuario(email: string, password: string, extraData: any) {
    try {
      // 1. Crear el usuario en Firebase Auth [cite: 6, 7]
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = userCredential.user.uid;

      // 2. Guardar la información extra en Firebase Database (Firestore) [cite: 10, 78]
      const userDocRef = doc(this.firestore, `usuarios/${uid}`);
      await setDoc(userDocRef, {
        email: email,
        nombre: extraData.nombre,       // [cite: 9, 76]
        apellidos: extraData.apellidos, // [cite: 9, 76]
        imagen: extraData.imagen,       // [cite: 9, 76]
        createdAt: new Date()
      });

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }
  async loginUsuario(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }
}
