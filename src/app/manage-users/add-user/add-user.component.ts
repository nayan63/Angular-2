import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userApi: UserService,private fromBuilder:FormBuilder,public rt:Router) { }

  hobbies=[
    {
      value: "singing",
      desc: "Singing"
    },
    {
      value: "dancing",
      desc: "Dancing"
    },
    {
      value: "playing",
      desc: "Playing"
    }
  ];
  genders=["male","female"];

  userForm!:FormGroup;
  ngOnInit(): void {
    this.userForm=this.fromBuilder.group(
      {
        "id": [''],
        "name": ['',[Validators.required,Validators.pattern('^[a-zA-Z\\s]*$')]],
        "age" : ['',[Validators.required]],
        "gender": ['',[Validators.required]],
        "hobbies": this.fromBuilder.array([]),
        "address": ['']
      });
  }

  get id()
  {
    return this.userForm.get('id');
  }
  get name()
  {
    return this.userForm.get('name');
  }
  get age()
  {
    return this.userForm.get('age');
  }
  get gender()
  {
    return this.userForm.get('gender');
  }
  get hobbiesArr()
  {
    return <FormArray>this.userForm.get('hobbies');
  }
  get address()
  {
    return this.userForm.get('address');
  }

  onHobbieCheck(event:any)
  {
    const checkHobbie: FormArray= this.userForm.get('hobbies') as FormArray;
    if(event.target.checked)
    {
      checkHobbie.push(new FormControl(event.target.value))
    }
    else
    {
      var i=0;
      checkHobbie.controls.forEach((item:any)=>
      {
        if(item.value==event.target.value)
        {
          checkHobbie.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  addUser()
  {
    if(this.userForm.valid)
    {
      this.userApi.addUser(this.userForm.value);
      this.rt.navigate(['users/list-user'])
    }
    else
    {
      alert("Please Enter Proper Details");
    }
  }
}
