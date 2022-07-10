import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionRecommendationsComponent } from './connection-recommendations.component';

describe('ConnectionRecommendationsComponent', () => {
  let component: ConnectionRecommendationsComponent;
  let fixture: ComponentFixture<ConnectionRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionRecommendationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
