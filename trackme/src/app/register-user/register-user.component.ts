import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  providers: [UserService]
})
export class RegisterUserComponent implements OnInit{
  users: User[];
  user: User;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;


  error: string;

  currentUserID = localStorage.getItem('currentUser');
  currentCompanyID = localStorage.getItem('currentCompany');

  constructor(private userService: UserService, private router: Router){}

  addUser(){
    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }

    this.userService.addUser(newUser).subscribe(user => {
      this.users.push(newUser);
      if(user['error']){
        this.error = "User Already Exists";
      }
      else{
        this.router.navigate(['/user-login']);
      }        
    });
  }

  ngOnInit(){
    if(this.currentUserID || this.currentCompanyID){
      this.router.navigate(['/']);
    }
    this.userService.getUsers().subscribe(
      users => this.users = users);
  }
}
