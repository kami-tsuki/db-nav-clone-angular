import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopInfoComponent } from './stop-info.component';

describe('StopInfoComponent', () => {
  let component: StopInfoComponent;
  let fixture: ComponentFixture<StopInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StopInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
