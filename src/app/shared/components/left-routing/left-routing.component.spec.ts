import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftRoutingComponent } from './left-routing.component';

describe('LeftRoutingComponent', () => {
  let component: LeftRoutingComponent;
  let fixture: ComponentFixture<LeftRoutingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftRoutingComponent]
    });
    fixture = TestBed.createComponent(LeftRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
