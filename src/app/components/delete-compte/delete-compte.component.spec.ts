import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCompteComponent } from './delete-compte.component';

describe('DeleteCompteComponent', () => {
  let component: DeleteCompteComponent;
  let fixture: ComponentFixture<DeleteCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
