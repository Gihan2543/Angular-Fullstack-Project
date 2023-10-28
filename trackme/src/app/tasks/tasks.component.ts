import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TaskService]
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  task: Task;
  userID: string;
  task_name: string;
  startTime: number;
  endTime: number;
  hours: number;
  minutes: number;
  date: string;

  currentUserID = localStorage.getItem('currentUser');

  error: string;

  dates = [];

  constructor(private taskService: TaskService, private router: Router){}

  addTask(){

    var end = new Date(this.endTime);
    var start = new Date(this.startTime);

    var milliseconds =  end.getTime() - start.getTime();
    var seconds = Math.round(milliseconds/1000);
    var minutes = Math.round(seconds/60);
    var hours = Math.round(minutes/60);

    seconds = seconds % 60;
    minutes = minutes % 60;


    var startDate = start.getTime();
    var endDate = end.getTime();

    var belongDate = start.toLocaleDateString('default', {month: "short", day: "numeric", year: "numeric"});

    const newTask = {
      userID: this.currentUserID,
      task_name: this.task_name,
      startTime: startDate,
      endTime: endDate,
      hours: hours,
      minutes: minutes,
      date: belongDate
    }

    this.taskService.addTask(newTask).subscribe(task => {
      this.tasks.push(newTask);
      window.location.reload();
    });
  }

  deleteTask(id:string){
    this.taskService.deleteTask(id).subscribe(data => {
      if(data){
        for(var i=0; i<this.tasks.length; i++){
          if(this.tasks[i]._id == id){
            this.tasks.splice(i,1);
            window.location.reload();
          }
        }
      }
    })
  }

  ngOnInit(){
    if(!this.currentUserID){
      this.router.navigate(['/']);
    }
    this.taskService.getTasks(this.currentUserID).subscribe(
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
        }
      });
    
  }
}
