import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  // Capturamos el elemento de video del HTML
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  // Añade aquí todos los videos que quieras reproducir en orden
  videos: string[] = [
    '/shared/videos/video-title-1.mp4',
    '/shared/videos/video-title-2.mp4' // <- Cambia esto por la ruta real de tu segundo video
  ];

  currentVideoIndex: number = 0;

  ngAfterViewInit(): void {
    // Iniciamos el video en cuanto la vista esté cargada
    this.reproducirVideo();
  }

  reproducirVideo(): void {
    if (this.heroVideo && this.heroVideo.nativeElement) {
      const videoPlayer = this.heroVideo.nativeElement;

      // Aseguramos que esté silenciado (requisito estricto de los navegadores para autoplay)
      videoPlayer.muted = true;

      // Forzamos la reproducción programáticamente
      videoPlayer.play().catch(err => {
        console.warn('El navegador bloqueó el autoplay. Se requiere interacción previa.', err);
      });
    }
  }

  onVideoEnded(): void {
    // Incrementamos el índice para pasar al siguiente video
    this.currentVideoIndex++;

    // Si llegamos al final de la lista, volvemos a empezar (hace la función del 'loop')
    if (this.currentVideoIndex >= this.videos.length) {
      this.currentVideoIndex = 0;
    }

    // Usamos setTimeout para darle tiempo a Angular de actualizar el [src] en el DOM
    setTimeout(() => {
      this.reproducirVideo();
    }, 0);
  }
}
