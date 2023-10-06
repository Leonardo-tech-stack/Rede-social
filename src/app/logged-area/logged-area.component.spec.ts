import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedAreaComponent } from './logged-area.component';

describe('LoggedAreaComponent', () => {
  let component: LoggedAreaComponent;
  let fixture: ComponentFixture<LoggedAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedAreaComponent]
    });
    fixture = TestBed.createComponent(LoggedAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
