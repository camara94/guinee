import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesBoutiquesComponent } from './mes-boutiques.component';

describe('MesBoutiquesComponent', () => {
  let component: MesBoutiquesComponent;
  let fixture: ComponentFixture<MesBoutiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesBoutiquesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesBoutiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
