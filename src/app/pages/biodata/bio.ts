import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bio.html',
  styleUrl: './bio.css',
})

export class Bio {
  private router = inject(Router);

  age: number | undefined;
  height: number | undefined;
  genre: string = ``;
  protected bioData: number = 0;
  goal: string = '';
  act: string = '';
  cKg: number | undefined;
  dKg: number | undefined;
  nWeeks: number | undefined;


  next() {
    this.bioData += 1;
  }
  back(){
    this.bioData -= 1;
  }

  saveData() {
    localStorage.setItem('genre', this.genre.valueOf());
    // @ts-ignore
    localStorage.setItem('age', this.age.valueOf());
    // @ts-ignore
    localStorage.setItem('height', this.height.valueOf());
    localStorage.setItem('goal', this.goal.valueOf());
    localStorage.setItem('act', this.act.valueOf());
    // @ts-ignore
    localStorage.setItem('cKg', this.cKg.valueOf());
    // @ts-ignore
    localStorage.setItem('dKg', this.dKg.valueOf());
    // @ts-ignore
    localStorage.setItem('nWeeks', this.nWeeks.valueOf());
    this.router.navigate(['/login']);
  }

  onChange(e: any) {
    if (e.target.name === 'radio') {
      this.goal = e.target.value;
    }

    if (e.target.name === 'radio1') {
      this.act = e.target.value;
    }
  }
}
