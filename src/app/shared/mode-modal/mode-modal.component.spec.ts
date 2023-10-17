import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeModalComponent } from './mode-modal.component';

describe('ModeModalComponent', () => {
  let component: ModeModalComponent;
  let fixture: ComponentFixture<ModeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeModalComponent]
    });
    fixture = TestBed.createComponent(ModeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
