import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginCompanyComponent } from './login-company.component';
import { FormsModule } from '@angular/forms';

describe('LoginCompanyComponent', () => {
  let component: LoginCompanyComponent;
  let fixture: ComponentFixture<LoginCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginCompanyComponent ],
      imports: [HttpClientTestingModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Testing Company Login Component Created Successfully', () => {
    expect(component).toBeTruthy();
  });
});
