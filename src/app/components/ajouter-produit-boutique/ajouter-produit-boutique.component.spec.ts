import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterProduitBoutiqueComponent } from './ajouter-produit-boutique.component';

describe('AjouterProduitBoutiqueComponent', () => {
  let component: AjouterProduitBoutiqueComponent;
  let fixture: ComponentFixture<AjouterProduitBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterProduitBoutiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterProduitBoutiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
