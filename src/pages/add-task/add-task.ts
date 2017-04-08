import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html'
})
export class AddTaskModal {
  
  newTaskForm: FormGroup;
  submitAttempt: boolean = false;

  dueDate;
  

  constructor(public navCtrl: NavController, public view: ViewController,
                public formBuilder: FormBuilder) {
    
    this.dueDate = new Date().toISOString();

    this.newTaskForm = formBuilder.group({
       taskTitle: [ '',
                    Validators.compose([ 
                          Validators.maxLength(30), 
                          Validators.pattern('[a-zA-Z ]*'), 
                          Validators.required])
                  ],
       dueDate : ['',Validators.required]
    });

  }

  ionViewDidLoad() {
    
  }

  generateRandomId(){
      return Math.random().toString(36).substring(7);
  }

  saveTask(){
    this.submitAttempt = true;

    if(!this.newTaskForm.valid){
        console.log("not save task success!");
    }else {
      let newTask = {
        task_id : this.generateRandomId(),
        status : false,
        title : this.newTaskForm.controls['taskTitle'].value,
        due_date : moment(this.dueDate).format("YYYY-MM-DD"),
      }
      this.view.dismiss(newTask);
    }
  }

  close(){
    this.view.dismiss();
  }

}
