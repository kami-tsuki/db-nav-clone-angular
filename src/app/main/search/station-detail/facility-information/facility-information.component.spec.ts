import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityInformationComponent } from './facility-information.component';

describe('FacilityInformationComponent', () => {
  let component: FacilityInformationComponent;
  let fixture: ComponentFixture<FacilityInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilityInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
