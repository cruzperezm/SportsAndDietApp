import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePage } from './detalle.page';
import { Firestore } from '@angular/fire/firestore';
import { SqliteService } from '../../services/sqlite.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DetallePage', () => {
  let component: DetallePage;
  let fixture: ComponentFixture<DetallePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePage],
      providers: [
        { provide: Firestore, useValue: {} },
        { provide: SqliteService, useValue: { esFavorito: () => Promise.resolve(false) } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
