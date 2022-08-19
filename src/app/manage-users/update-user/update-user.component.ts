import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { user } from '../../service/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user:any;
  selectHobbie:any;

  constructor(private fromBuilder:FormBuilder,private rt:Router,public userApi:UserService,private route: ActivatedRoute) { }

  hobbies=[
    {
      value: "Singing",
      isSelect: false
    },
    {
      value: "Dancing",
      isSelect: false
    },
    {
      value: "Playing",
      isSelect: false
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
    this.editUser();
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


  // updateUser()
  // {
  //   if(this.userForm.valid)
  //   {
  //     this.userApi.addUser(this.userForm.value);
  //     this.rt.navigate(['/list-user'])
  //   }
  //   else
  //   {
  //     alert("Please Enter Proper Details");
  //   }
  // }

  setHobbie:any=[];
  editUser()
  {
    let id = this.route.snapshot.params.id;
    this.user = this.userApi.editUser(id);
    if(this.user!=null)
    {
        this.userForm.patchValue({
          "id": this.user.id,
          "name": this.user.name,
          "age": this.user.age,
          "gender": this.user.gender,
          "address": this.user.address
      });
      this.userForm.setControl('hobbies', this.fromBuilder.array(this.user.hobbies));

      this.selectHobbie = this.userForm.value.hobbies;
      for(let hobbie of this.hobbies)
      {
        for(let sh of this.selectHobbie)
        {
          if(sh==hobbie.value)
          {
            this.setHobbie.push({value:hobbie.value,isSelect:true})
          }
          else
          {
            this.setHobbie.push({value:hobbie.value,isSelect:false})
          }
        }
      }
    }
    else{
      alert("Sorry. No User Found");
      this.rt.navigate(['users/list-user']);
    }
  }

  updateUser()
  {
    console.log(this.userForm.value)
  }
}
