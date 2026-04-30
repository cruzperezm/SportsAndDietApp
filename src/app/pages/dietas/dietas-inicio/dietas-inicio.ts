import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DietaService } from '../../../services/dietas';

@Component({
  selector: 'app-dietas-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dietas-inicio.html',
  styleUrl: './dietas-inicio.css',
})
export class DietasInicioComponent implements OnInit {
  //variables del buscador
  modoBusqueda: boolean = false;
  resultados: any[] = [];
  textoBusqueda: string = '';

  //grid inicial
  dietas: any[] = [
    { id: 'keto', nombre: 'Dieta Keto', imagen: 'assets/img/dieta/keto/portada-keto.jpg' },
    { id: 'mediterranea', nombre: 'Mediterránea', imagen: 'assets/img/dieta/mediterranea/portada-mediterranea.jpg' },
    { id: 'vegana', nombre: 'Dieta Vegana', imagen: 'assets/img/dieta/vegana/portada-vegana.jpg' },
    { id: 'volumen', nombre: 'Volumen', imagen: 'assets/img/dieta/volumen/portada-volumen.jpg' },
    { id: 'definicion', nombre: 'Definición', imagen: 'assets/img/dieta/definicion/portada-definicion.jpg' },
    { id: 'paleo', nombre: 'Paleo', imagen: 'assets/img/dieta/paleo/portada-paleo.jpg' },
  ];

  constructor(
    private router: Router,
    private dietaService: DietaService,
  ) {}

  ngOnInit() {
    //si en el futuro quieren cargar las dietas iniciales desde el JSON también,
    //podrías borrar el array de arriba y descomentar esta línea:
    //this.dietaService.obtenerDietasInicio().subscribe(data => this.dietas = data);
  }

  //navegación original a los planes -
  irAlPlan(id: string) {
    console.log('Intentando navegar al ID:', id);
    this.router.navigate(['/dietas/plan', id]);
  }


  //logica del buscador simple
  onBuscar(event: any) {
    this.textoBusqueda = event.target.value;

    //solo inicia la búsqueda si escribe más de 2 letras
    if (this.textoBusqueda.length > 2) {
      this.modoBusqueda = true;

      this.dietaService.buscarRecetas(this.textoBusqueda).subscribe((datos: any[]) => {
        this.resultados = datos;
      });
    } else {
      //si se borra el texto o hay menos de 3 letras, apagamos el buscador
      this.modoBusqueda = false;
      this.resultados = [];
    }
  }

  limpiarBusqueda() {
    this.textoBusqueda = '';
    this.modoBusqueda = false;
    this.resultados = [];
  }

  //para navegar a la receta desde el buscador
  irAReceta(id: string) {
    this.router.navigate(['/dietas/receta', id]);
  }
}
