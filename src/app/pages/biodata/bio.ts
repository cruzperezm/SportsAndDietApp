import { Component, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { BioService } from "../../services/bioservice";
import { routes } from '../../app.routes';

@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './bio.html',
  styleUrl: './bio.css',
})

export class Bio {
  private fb = inject(FormBuilder);
  private bioService = inject(BioService);
  private router = inject(Router);

  protected bioData: number = 0;
  private queryId: number | null | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.queryId = parseInt(<string>this.route.snapshot.queryParamMap.get('userId'));
  }

  bioForm: FormGroup = this.fb.group({
    gender: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.min(14), Validators.max(120)]],
    height: ['', [Validators.required, Validators.min(120), Validators.max(220)]],
    goal: ['', [Validators.required]],
    act: ['', [Validators.required]],
    cKg: ['', [Validators.required]],
    dKg: ['', [Validators.required]],
    nWeeks: ['', [Validators.required, Validators.min(1)]],
  });

  next() {
    this.bioData += 1;
  }
  back(){
    this.bioData -= 1;
  }

  isLoading = false;
  errorMessage = '';


  async saveData() {
    if (this.bioForm.invalid) return;
    try {
    // @ts-ignore
      await this.bioService
      .addBioData(this.bioForm.value)
      .then((res) =>{ console.log('OK:', res)
      this.router.navigate(['/dashboard-dieta']);})
      .catch((err) => console.error('ERROR:', err));}
    catch(err) {console.error('ERROR:', err)}
  }

  get gender(){
    return this.bioForm.get('gender')
  }

  get height(){
    return this.bioForm.get('height')
  }

  get age(){
    return this.bioForm.get('age')
  }

  get goal(){
    return this.bioForm.get('goal')
  }

  get act(){
    return this.bioForm.get('act')
  }

  get cKg(){
    return this.bioForm.get('cKg')
  }

  get dKg(){
    return this.bioForm.get('dKg')
  }

  get nWeeks(){
    return this.bioForm.get('nWeeks')
  }

}
