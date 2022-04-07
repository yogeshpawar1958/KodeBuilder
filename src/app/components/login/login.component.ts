import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
 import Swal from 'sweetalert2';
 import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name:any;
password:any;
  constructor(
    private router:Router,
    private fb:FormBuilder,
    private dataService:DataServiceService
  ) { }

  LoginForm= this.fb.group ({
    username: new FormControl('',
    Validators.compose([ Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),])),


    password:new FormControl('',Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(15),
          ]),)
  })


profile=this.dataService.profile


  ngOnInit(): void {

  }


   loginUser=()=>{
   
this.name=this.LoginForm.value.username;
this.password=this.LoginForm.value.password;
let mapdata=this.profile.find((cur,index)=>{
  return ((this.name==cur.userName ||this.name==cur.email)&& this.password==cur.pass)
})

for(let i=0;i<this.profile.length;i++){
  if((this.name==this.profile[i].userName ||this.name==this.profile[i].email)&& this.password==this.profile[i].pass){
    this.dataService.profile[i].isLogin=true;
  }
}
if(mapdata!=undefined){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500,
    width: '350',
    
  })
this.router.navigate(['/home'])
}else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Username and Password Not Match!',
    timer: 3000,
    width: '350',
  })
}
  }

}
