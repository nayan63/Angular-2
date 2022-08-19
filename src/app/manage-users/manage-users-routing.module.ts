import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { HomeComponent } from './home/home.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'users', pathMatch:'full',
  },
  {
    path: 'users', component: HomeComponent,  
    children: 
    [
      {
        path: 'add-user', component: AddUserComponent, 
      },
      {
        path: 'list-user', component: ListUserComponent,  
      },
      {
        path: 'list-user/edit/:id', component: UpdateUserComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUsersRoutingModule { }
