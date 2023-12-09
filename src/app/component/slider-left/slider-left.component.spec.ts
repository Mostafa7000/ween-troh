import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderLeftComponent } from './slider-left.component';

describe('SliderLeftComponent', () => {
  let component: SliderLeftComponent;
  let fixture: ComponentFixture<SliderLeftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderLeftComponent]
    });
    fixture = TestBed.createComponent(SliderLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
