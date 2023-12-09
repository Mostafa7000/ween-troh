import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProcessComponent } from './all-process.component';

describe('AllProcessComponent', () => {
  let component: AllProcessComponent;
  let fixture: ComponentFixture<AllProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllProcessComponent]
    });
    fixture = TestBed.createComponent(AllProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
