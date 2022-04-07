import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor( private http:HttpClient) { }


 getData=()=>{
  return this.http.get('http://localhost:3000/posts').pipe(map((resp:any)=>{
    return resp;
  }))

  }

  postData=(data:any)=>{
    return this.http.post<any>('http://localhost:3000/posts',data).pipe(map((resp:any)=>{
      return resp;
    }))
  }

  updatData =(data:any,id:number)=>{
    return this.http.put("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteData=(id:any)=>{
    console.log("in service",id)

    return this.http.delete("http://localhost:3000/posts/"+id).pipe(map((resp:any)=>{
      return resp;
    }))
  }


   profile=[
    {userName:'yogesh',email:'yog@gmail.com',pass:'12345',isLogin:false},
    {userName:'rajesh',email:'rajesh@gmail.com',pass:'12345',isLogin:false},
    {userName:'gaurav',email:'gaurav@gmail.com',pass:'12345',isLogin:false},
    {userName:'Ganesh',email:'ganesh@gmail.com',pass:'12345',isLogin:false}
  ]
  
   
}


