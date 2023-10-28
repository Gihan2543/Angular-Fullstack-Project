import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Testing Footer Component Created Successfully', () => {
    expect(component).toBeTruthy();
  });

  it('Testing Footer Component Shows Year Properly', () => {
    var year = new Date().getFullYear();
    expect(component.thisYear).toBe(year);
  });
});
