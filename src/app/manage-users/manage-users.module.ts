import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule,Routes } from '@angular/router';
import { UpdateUserComponent } from './update-user/update-user.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddUserComponent,
    ListUserComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class ManageUsersModule { }
