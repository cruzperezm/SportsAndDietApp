import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage],
  templateUrl: './explorer.html',
  styleUrl: './explorer.css',
})
export class Explorer {
  map = '/assets/img/GC.svg';
  private router = inject(Router);
}
