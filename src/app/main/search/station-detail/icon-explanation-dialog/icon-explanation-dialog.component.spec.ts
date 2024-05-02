import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconExplanationDialogComponent } from './icon-explanation-dialog.component';

describe('IconExplanationDialogComponent', () => {
  let component: IconExplanationDialogComponent;
  let fixture: ComponentFixture<IconExplanationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconExplanationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconExplanationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
