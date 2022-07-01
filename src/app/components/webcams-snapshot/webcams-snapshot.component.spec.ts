import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamsSnapshotComponent } from './webcams-snapshot.component';

describe('WebcamsSnapshotComponent', () => {
  let component: WebcamsSnapshotComponent;
  let fixture: ComponentFixture<WebcamsSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebcamsSnapshotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamsSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
