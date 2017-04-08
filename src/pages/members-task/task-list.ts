import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AddTaskModal } from '../add-task/add-task';
import { Data } from '../../providers/data';
import * as moment from 'moment';

@Component({
    selector: 'page-task-list',
    templateUrl:'task-list.html'
})

export class TaskListPage{
  selectedMember: any;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modal : ModalController,
              public storage : Data) {
    
    this.selectedMember = navParams.get('selectedMember');
   
  }

  checkDueDate(taskDate){
    return moment().diff(moment(taskDate),'days') ? true : false;
  }

  modifyTask(task){
    this.storage.getData().then((members) => {
        if(members){
            let membersData = JSON.parse(members); 

            membersData.forEach((data) => {
                data.tasks.forEach((tasks)=>{
                    if(task.task_id === tasks.task_id){
                        tasks.status = task.status;
                    }
                })
            });

            this.storage.setData(membersData);
        } 
     });
  }

  removeTask(task){
      for(let i=0; i<this.selectedMember.tasks.length ; i++){
          if(this.selectedMember.tasks[i].title === task.title){
             this.selectedMember.tasks.splice(i,1);
          }
      }

      this.storage.getData().then((members) => {
        if(members){
            let membersData = JSON.parse(members); 

            membersData.forEach((data) => {
                if (data.first_name === this.selectedMember.first_name){
                    data.tasks = this.selectedMember.tasks;
                }
            });

            this.storage.setData(membersData);
        } 
     });
  }

  saveTaskToStorage(task){
    this.storage.getData().then((members) => {
        if(members){
            let membersData = JSON.parse(members); 

            membersData.forEach((data) => {
                if (data.first_name === this.selectedMember.first_name){
                    this.selectedMember.tasks.push(task);
                    data.tasks.push(task);
                }
            })

            this.storage.setData(membersData);
        } 
    });
  }

  addTask(){
    let addTaskModal = this.modal.create(AddTaskModal);

    addTaskModal.onDidDismiss((task)=>{
        if(task){
            this.saveTaskToStorage(task);
        }
    });

    addTaskModal.present();
  }

}
