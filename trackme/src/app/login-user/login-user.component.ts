import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
  providers: [UserService]
})
export class LoginUserComponent implements OnInit {

  email: string;
  password: string;

  error: string;

  success: string;

  currentUserID = localStorage.getItem('currentUser');
  currentCompanyID = localStorage.getItem('currentCompany');

  constructor(private userService: UserService, private router: Router){}

  loginUser(){
    const user = {
      email: this.email,
      password: this.password
    }

    this.userService.logUser(user).subscribe(user => {
      if(user['error']){
        this.error = "Unknown error occurred. Please try again";
      }
      if(user['nouser']){
        this.error = "User not found";
      }
      if(user['fail']){
        this.error = "Incorrect Email or Password";
      }
      if(user['success']){
        var token = localStorage.setItem('token', user['token']);
        localStorage.setItem('currentUser', user['userID']);
        this.success = "User logged in successfully";
        this.router.navigateByUrl('/user-login', { skipLocationChange: false }).then(() => {
          this.router.navigate(['/tasks']);
        }).then(()=>{
          window.location.reload();
        })
      }
    })
  }

  ngOnInit() {
    if(this.currentUserID || this.currentCompanyID){
      this.router.navigate(['/']);
    }
  }

}
