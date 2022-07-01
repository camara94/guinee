import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitParCategoryComponent } from './produit-par-category.component';

describe('ProduitParCategoryComponent', () => {
  let component: ProduitParCategoryComponent;
  let fixture: ComponentFixture<ProduitParCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitParCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitParCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
