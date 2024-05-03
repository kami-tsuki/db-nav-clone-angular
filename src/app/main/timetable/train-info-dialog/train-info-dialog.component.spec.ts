import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainInfoDialogComponent } from './train-info-dialog.component';

describe('TrainInfoDialogComponent', () => {
  let component: TrainInfoDialogComponent;
  let fixture: ComponentFixture<TrainInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainInfoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
