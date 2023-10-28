import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Get Users
  getUsers(){
    return this.http.get<User[]>('http://localhost:3000/api/users');
  } 
  

  // Login User
  logUser(loginUser){
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/users/login', loginUser, {headers: headers});
  }

  // Get User
  getUser(id){
    return this.http.get<User[]>('http://localhost:3000/api/users/'+id);
  }

  // Add User
  addUser(newUser){
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/users/signup', newUser, {headers: headers});
  }

  // Detele User
  deleteUser(id){
    return this.http.delete('http://localhost:3000/api/users/delete/'+id);
  }
}
