import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
 import Swal from 'sweetalert2';

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
    private fb:FormBuilder
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


profile=[
  {userName:'yogesh',email:'yog@gmail.com',pass:'12345'},
  {userName:'rajesh',email:'rajesh@gmail.com',pass:'12345'},
  {userName:'gaurav',email:'gaurav@gmail.com',pass:'12345'},
  {userName:'Ganesh',email:'ganesh@gmail.com',pass:'12345'}
]


  ngOnInit(): void {
  }


   loginUser=()=>{
   
this.name=this.LoginForm.value.username;
this.password=this.LoginForm.value.password;
let mapdata=this.profile.find((cur,index)=>{
  return ((this.name==cur.userName ||this.name==cur.email)&& this.password==cur.pass)
})

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
