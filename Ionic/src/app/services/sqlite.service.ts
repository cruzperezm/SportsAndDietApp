// src/app/services/sqlite.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private favoritosLocal: string[] = []; // Simulación de persistencia local

  constructor() {}

  // Verifica si un elemento ya es favorito en SQLite [cite: 168]
  async esFavorito(itemId: string): Promise<boolean> {
    return this.favoritosLocal.includes(itemId);
  }

  // Escribir registro en SQLite [cite: 130, 152]
  async agregarAFavoritos(itemId: string) {
    if (!this.favoritosLocal.includes(itemId)) {
      this.favoritosLocal.push(itemId);
      console.log(`Elemento ${itemId} guardado en SQLite`);
    }
  }

  // Borrar registro de SQLite [cite: 130, 152]
  async quitarDeFavoritos(itemId: string) {
    this.favoritosLocal = this.favoritosLocal.filter(id => id !== itemId);
    console.log(`Elemento ${itemId} eliminado de SQLite`);
  }

  // Leer todos para la lista de la Etapa 3 [cite: 151]
  async getFavoritos(): Promise<string[]> {
    return [...this.favoritosLocal];
  }
}
