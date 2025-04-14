import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsWidgetComponent } from './insights-widget.component';

describe('InsightsWidgetComponent', () => {
  let component: InsightsWidgetComponent;
  let fixture: ComponentFixture<InsightsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsightsWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsightsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
