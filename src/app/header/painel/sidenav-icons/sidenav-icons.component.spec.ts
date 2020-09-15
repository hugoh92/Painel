import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavIconsComponent } from './sidenav-icons.component';

describe('SidenavIconsComponent', () => {
  let component: SidenavIconsComponent;
  let fixture: ComponentFixture<SidenavIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
