import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerPanierComponent } from './supprimer-panier.component';

describe('SupprimerPanierComponent', () => {
  let component: SupprimerPanierComponent;
  let fixture: ComponentFixture<SupprimerPanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerPanierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
