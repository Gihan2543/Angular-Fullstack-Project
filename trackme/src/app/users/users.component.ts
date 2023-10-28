import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { Task } from '../task';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService, TaskService]
})
export class UsersComponent implements OnInit {

  tasks: Task[] = [];
  task: Task;
  users: User[] = [];
  user: User;
  firstName: string;
  lastName: string;
  email: string;

  username: string;

  dates = [];

  error: string;

  currentCompanyID = localStorage.getItem('currentCompany');

  constructor(private taskService: TaskService, private router: Router, private userService: UserService){}


  showTasks(userID, firstName, lastName){
    this.username = firstName + ' ' + lastName;
    this.error = '';
    this.tasks = [];
    this.taskService.getTasks(userID).subscribe(
      tasks => {
        if(tasks['notasks']){
          this.error = "No tasks found";
        }
        else{
          tasks.forEach(task => {
            var todayDate = task.date;
            if(!this.dates.includes(todayDate)){
              this.dates.push(todayDate);
            }
            
          });
          this.dates.sort();
          this.tasks = tasks;
          console.log(this.tasks);
          
        }
      });
  }


  ngOnInit(){
    if(!this.currentCompanyID){
      this.router.navigate(['/']);
    }
    this.userService.getUsers().subscribe(
      users => this.users = users);
  }

}
