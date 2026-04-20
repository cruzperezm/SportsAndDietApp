import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietasPlan } from './dietas-plan';

describe('DietasPlan', () => {
  let component: DietasPlan;
  let fixture: ComponentFixture<DietasPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DietasPlan],
    }).compileComponents();

    fixture = TestBed.createComponent(DietasPlan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
