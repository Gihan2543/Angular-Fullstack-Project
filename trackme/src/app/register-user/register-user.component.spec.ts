import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from '../user.service';
import { RegisterUserComponent } from './register-user.component';
import { FormsModule } from '@angular/forms';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserComponent ],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [UserService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Testing Register User Component Created Successfully', () => {
    expect(component).toBeTruthy();
  });
});
