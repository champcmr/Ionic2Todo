import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { Data } from '../../providers/data';

import { TaskListPage } from '../members-task/task-list';
import { NewMemberModal } from '../new-member/new-member';


@Component({
    selector: 'members-list',
    templateUrl : 'members.html',
    providers:[Data]
})

export class MembersPage {

    members = [];

    constructor( public navCtrl: NavController, 
                 public modal: ModalController,
                 public storage : Data){

            this.storage.getData().then((members) => {
                if(members){
                    this.members = JSON.parse(members); 
                } 
            });                                        
    }

    ionViewDidLoad(){

    }

    fnMemberTapped(event, member){
        this.navCtrl.push(TaskListPage, {
            selectedMember : member
        });
    }

    saveMemberToStorage(member){
        this.members.push(member);
        this.storage.setData(this.members);
    }

    addMember(){
        let addMemberModal = this.modal.create(NewMemberModal);

        addMemberModal.onDidDismiss((member)=>{
            if(member){
                this.saveMemberToStorage(member);
            }
        });
    
        addMemberModal.present();
    }

}