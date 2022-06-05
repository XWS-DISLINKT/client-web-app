import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBiographyComponent } from './add-biography.component';

describe('AddBiographyComponent', () => {
  let component: AddBiographyComponent;
  let fixture: ComponentFixture<AddBiographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBiographyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
