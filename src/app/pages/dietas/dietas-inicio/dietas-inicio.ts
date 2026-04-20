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
  dietas = [
    { id: 1, nombre: 'Dieta Keto', imagen: 'assets/img/keto.jpg' },
    { id: 2, nombre: 'Dieta Vegana', imagen: 'assets/img/vegana.jpg' },
    { id: 3, nombre: 'Mediterránea', imagen: 'assets/img/mediterranea.jpg' },
    { id: 4, nombre: 'Ayuno Intermitente', imagen: 'assets/img/ayuno.jpg' },
    { id: 5, nombre: 'Sin Gluten', imagen: 'assets/img/singluten.jpg' },
    { id: 6, nombre: 'Paleo', imagen: 'assets/img/paleo.jpg' },
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
  irAlPlan(id: number) {
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
