import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';

  getTasks() {
    return this.http.get(this.rootURL + '/chamados');
  }

  addTask(task: any) {
    console.log(task);
    return this.http.post(this.rootURL + '/chamados', {task});
  }
}
