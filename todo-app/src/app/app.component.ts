import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { AppConfigService } from './appconfig.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,  OnDestroy {

  constructor(private appService: AppService, private appConfigService: AppConfigService) {}

  title = 'angular-nodejs-example';

  todoForm = new FormGroup({
    nome: new FormControl('', Validators.nullValidator && Validators.required),
    email: new FormControl('', Validators.nullValidator && Validators.required),
    descricao: new FormControl('', Validators.nullValidator && Validators.required)
  });

  tasks: any[] = [];
  settings: any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  onSubmit() {
    console.log(this.todoForm.value);
    this.appService.addTask(this.todoForm.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      this.getTasks();
      this.todoForm.reset();
    });
  }
  
  getTasks() {
    this.appService.getTasks().pipe(takeUntil(this.destroy$)).subscribe((tasks: any[]) => {
      this.tasks = tasks;
    });
  }

  getAppSettings() {
    this.settings = this.appConfigService.settings;
  }

  ngOnInit() {
    this.getTasks();
    this.getAppSettings();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
