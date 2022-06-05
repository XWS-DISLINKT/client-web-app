import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayConnectionTokenComponent } from './display-connection-token.component';

describe('DisplayConnectionTokenComponent', () => {
  let component: DisplayConnectionTokenComponent;
  let fixture: ComponentFixture<DisplayConnectionTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayConnectionTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayConnectionTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
