// La raíz de tu JSON es un objeto que contiene el array "dietas"
export interface RootDietas {
  dietas: Dieta[];
}

// Representa una categoría entera (ej: Dieta Keto)
export interface Dieta {
  id: string;
  titulo: string;
  imagen: string;
  descripcion: string;
  plan: PlanMomento[];
}

// Representa Desayuno, Almuerzo o Cena
export interface PlanMomento {
  momento: string;
  opciones: Receta[];
}

// Representa el plato final (ej: Huevos con aguacate)
export interface Receta {
  id: string;
  nombre: string;
  imagen: string;
  alergenos?: string[]; // Opcional, por si alguna no tiene
  ingredientes: string[];
  informacion: InfoNutricional;
  preparacion: string;
}

// Representa los macros
export interface InfoNutricional {
  calorias: string;
  proteinas: string;
  grasas: string;
  carbohidratos: string;
}
