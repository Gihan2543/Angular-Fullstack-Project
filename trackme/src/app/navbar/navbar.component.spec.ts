import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Testing NavBar Component Created Successfully', () => {
    expect(component).toBeTruthy();
  });

  it('Testing NavBar Component Log Out Function works Successfully', () => {
    component.logout();
    expect(localStorage.getItem('currentUser')).toBe(null);
  });
});
