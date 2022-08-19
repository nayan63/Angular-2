import { Component, OnInit } from '@angular/core';
import { user, UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(private userService:UserService) { }

  userList:user[]=[];

  ngOnInit(): void {
    this.userList = this.userService.listUser();
  }

}
