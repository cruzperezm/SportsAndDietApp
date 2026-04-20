import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietasInicio } from './dietas-inicio';

describe('DietasInicio', () => {
  let component: DietasInicio;
  let fixture: ComponentFixture<DietasInicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DietasInicio],
    }).compileComponents();

    fixture = TestBed.createComponent(DietasInicio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
