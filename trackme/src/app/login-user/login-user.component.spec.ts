import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from '../user.service';
import { LoginUserComponent } from './login-user.component';
import { FormsModule } from '@angular/forms';

describe('LoginUserComponent', () => {
  let component: LoginUserComponent;
  let fixture: ComponentFixture<LoginUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginUserComponent ],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [UserService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Testing User Login Component Created Successfully', () => {
    const service: UserService = TestBed.inject(UserService);
    expect(service).toBeTruthy();
  });

});
