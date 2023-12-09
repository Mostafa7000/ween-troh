import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProcessShowComponent } from './all-process-show.component';

describe('AllProcessShowComponent', () => {
  let component: AllProcessShowComponent;
  let fixture: ComponentFixture<AllProcessShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllProcessShowComponent]
    });
    fixture = TestBed.createComponent(AllProcessShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
