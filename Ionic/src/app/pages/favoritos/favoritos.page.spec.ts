import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritosPage } from './favoritos.page';
import { Firestore } from '@angular/fire/firestore';
import { SqliteService } from '../../services/sqlite.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FavoritosPage', () => {
  let component: FavoritosPage;
  let fixture: ComponentFixture<FavoritosPage>;

  // Mocks básicos para que el test no explote
  const firestoreMock = { collection: jasmine.createSpy() };
  const sqliteMock = { getFavoritos: jasmine.createSpy().and.returnValue(Promise.resolve([])) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritosPage],
      providers: [
        { provide: Firestore, useValue: firestoreMock },
        { provide: SqliteService, useValue: sqliteMock },
        {
          provide: ActivatedRoute,
          useValue: { params: of({}) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
