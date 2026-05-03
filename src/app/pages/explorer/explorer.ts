import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './explorer.html',
  styleUrl: './explorer.css',
})
export class Explorer {
  map = '/assets/img/explorer/GC.svg';
  private router = inject(Router);
}
