import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietasDetalle } from './dietas-detalle';

describe('DietasDetalle', () => {
  let component: DietasDetalle;
  let fixture: ComponentFixture<DietasDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DietasDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(DietasDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
