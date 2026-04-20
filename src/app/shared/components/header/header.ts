import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Importante para que funcionen tus botones
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {
  private authService = inject(AuthService);

  private router = inject(Router);

  isLoggedIn$ = this.authService.isLoggedIn$;

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login
  }
}
