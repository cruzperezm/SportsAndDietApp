import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Importante para que funcionen tus botones
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {

  private router = inject(Router);

}
