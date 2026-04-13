import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './explorer.html',
  styleUrl: './explorer.css.css',
})

export class explorer{
  private router = inject(Router);
}
