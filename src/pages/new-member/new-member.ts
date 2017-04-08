import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController, ViewController } from 'ionic-angular';

@Component({
    selector:'new-member',
    templateUrl : '../new-member/new-member.html'
})

export class NewMemberModal{
    
    newMemberForm: FormGroup;
    submitAttempt: boolean = false;

    id;
    first_name;
    last_name;
    email;
    gender;
    tasks;

    constructor(public navctrl: NavController,
                public view: ViewController,
                public formBuilder: FormBuilder){

                    this.newMemberForm = formBuilder.group({
                        firstName: [ '',
                                     Validators.compose([ 
                                           Validators.maxLength(30), 
                                           Validators.pattern('[a-zA-Z ]*'), 
                                           Validators.required])
                                   ],
                        lastName: [ '', 
                                    Validators.compose([ 
                                          Validators.maxLength(30), 
                                          Validators.pattern('[a-zA-Z ]*'), 
                                          Validators.required])
                                  ],
                        email: [ '', 
                                 Validators.compose([
                                     Validators.required, 
                                     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
                               ],
                        gender: ['male',Validators.required]
                    });
        
    }

    getRandomId(){
        return Math.random().toString(36).substring(7);
    }

    saveMember(){
        this.submitAttempt = true;
 
        if(!this.newMemberForm.valid){
            console.log("not success!");
        }else {
            let newMember = {
                id : this.getRandomId(),
                first_name : this.newMemberForm.controls['firstName'].value,
                last_name: this.newMemberForm.controls['lastName'].value,
                email: this.newMemberForm.controls['email'].value,
                gender : this.newMemberForm.controls['gender'].value,
                tasks : []
            }
            console.log("success!",newMember);
            this.view.dismiss(newMember);
        }
    }
    
    close(){
        this.view.dismiss();
    }
}