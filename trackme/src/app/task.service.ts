import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  // Get Tasks
  getTasks(id){
    return this.http.get<Task[]>('http://localhost:3000/api/tasks/'+id);
  }

  // Add Tasks
  addTask(newTask){
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/tasks/create', newTask, {headers: headers});
  }

  // Detele Task
  deleteTask(id){
    return this.http.delete('http://localhost:3000/api/tasks/delete/'+id);
  }
}
