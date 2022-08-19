import { Injectable } from '@angular/core';

export interface user{
  id:number;
  name:string;
  age:number;
  gender:string;
  hobbies:string[];
  address:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users:user[]=[];
  constructor() { }

  addUser(data:user)
  {
    let lastId=this.users.length+1;
    
    this.users.push({id:lastId,name:data.name,age:data.age,gender:data.gender,hobbies: data.hobbies,address:data.address});
    console.log(this.users);
    return data;
  }

  listUser()
  {
    return this.users;
  }

  editUser(userId:number)
  {
    console.warn("Service "+userId);
    console.warn(this.users.length);
    for(let user of this.users)
    {
      if(user.id==userId)
      {
        console.log(user);
        return user;
      }
    }

    return null;
  }
}
