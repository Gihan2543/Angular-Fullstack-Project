import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-login-company',
  templateUrl: './login-company.component.html',
  styleUrls: ['./login-company.component.css'],
  providers: [CompanyService]
})
export class LoginCompanyComponent implements OnInit{

  email: string;
  password: string;

  error: string;

  currentUserID = localStorage.getItem('currentUser');
  currentCompanyID = localStorage.getItem('currentCompany');

  constructor(private companyService: CompanyService, private router: Router){}

  loginUser(){
    const user = {
      email: this.email,
      password: this.password
    }

    this.companyService.logUser(user).subscribe(user => {
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
        localStorage.setItem('currentCompany', user['userID']);
        this.router.navigateByUrl('/company-login', { skipLocationChange: false }).then(() => {
          this.router.navigate(['/users']);
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
