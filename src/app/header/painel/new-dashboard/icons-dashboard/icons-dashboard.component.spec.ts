import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsDashboardComponent } from './icons-dashboard.component';

describe('IconsDashboardComponent', () => {
  let component: IconsDashboardComponent;
  let fixture: ComponentFixture<IconsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
