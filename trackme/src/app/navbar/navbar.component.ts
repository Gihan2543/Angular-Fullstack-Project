import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUserID = localStorage.getItem('currentUser');
  currentCompanyID = localStorage.getItem('currentCompany');
  
  logout(){
    localStorage.clear();
  }
}
