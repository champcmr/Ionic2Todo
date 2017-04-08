import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { MembersPage } from '../pages/members/members';
import { TaskListPage } from '../pages/members-task/task-list';
import { NewMemberModal } from '../pages/new-member/new-member';
import { AddTaskModal } from '../pages/add-task/add-task'; 
import { Data } from '../providers/data';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    MembersPage,
    ListPage,    
    TaskListPage,
    NewMemberModal,
    AddTaskModal
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    MembersPage,
    TaskListPage,
    NewMemberModal,
    AddTaskModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Data,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {}
