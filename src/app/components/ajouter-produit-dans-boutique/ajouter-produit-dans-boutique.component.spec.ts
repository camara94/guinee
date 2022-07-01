import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterProduitDansBoutiqueComponent } from './ajouter-produit-dans-boutique.component';

describe('AjouterProduitDansBoutiqueComponent', () => {
  let component: AjouterProduitDansBoutiqueComponent;
  let fixture: ComponentFixture<AjouterProduitDansBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterProduitDansBoutiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterProduitDansBoutiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
