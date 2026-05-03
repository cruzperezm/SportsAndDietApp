import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  videos: string[] = [
    '/assets/videos/video-title-1.mp4',
    '/assets/videos/video-title-2.mp4',
  ];

  currentVideoIndex: number = 0;

  ngAfterViewInit(): void {
    this.reproducirVideo();
  }

  reproducirVideo(): void {
    if (this.heroVideo && this.heroVideo.nativeElement) {
      const videoPlayer = this.heroVideo.nativeElement;

      videoPlayer.muted = true;

      videoPlayer.play().catch((err) => {
        console.warn('El navegador bloqueó el autoplay. Se requiere interacción previa.', err);
      });
    }
  }

  onVideoEnded(): void {
    this.currentVideoIndex++;

    if (this.currentVideoIndex >= this.videos.length) {
      this.currentVideoIndex = 0;
    }

    setTimeout(() => {
      this.reproducirVideo();
    }, 0);
  }
}
