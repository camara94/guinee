import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeOuvertureBoutiqueComponent } from './demande-ouverture-boutique.component';

describe('DemandeOuvertureBoutiqueComponent', () => {
  let component: DemandeOuvertureBoutiqueComponent;
  let fixture: ComponentFixture<DemandeOuvertureBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeOuvertureBoutiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeOuvertureBoutiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
