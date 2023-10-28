import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Company } from './company';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  // Get Users
  getUsers(){
    return this.http.get<User[]>('http://localhost:3000/api/users');
  } 

  // Login User
  logUser(loginUser){
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/admins/login', loginUser, {headers: headers});
  }

}
