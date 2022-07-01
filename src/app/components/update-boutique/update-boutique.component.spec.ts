import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBoutiqueComponent } from './update-boutique.component';

describe('UpdateBoutiqueComponent', () => {
  let component: UpdateBoutiqueComponent;
  let fixture: ComponentFixture<UpdateBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBoutiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBoutiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
