import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataServiceService } from 'src/app/services/data-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

declare var window: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ReactiveForm !: FormGroup
  allData: any;
  isUpdate !: boolean;
  isAdd !: boolean;
  profileData: any;
  dataObj: any = {
    title: "",
    description: ""
  }

  formModal: any;
  constructor(
    private fb: FormBuilder,
    private http: DataServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData()
    this.profileData = this.http.profile
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")

    );

    this.ReactiveForm = this.fb.group({
      title: new FormControl('',
        Validators.compose([Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),])),


      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
      ]))
    })
  }

  openModel = () => {
    this.formModal.show();
    this.isAdd = true;
    this.isUpdate = false
  }

  getData = () => {
    this.http.getData().subscribe(resp => {
      this.allData = resp;

    })
  }

  postData = () => {
    this.dataObj.title = this.ReactiveForm.value.title;
    this.dataObj.description = this.ReactiveForm.value.description;
    console.log(this.dataObj)

    this.http.postData(this.dataObj).subscribe((resp) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
        width: '350',

      })
      this.getData()
      this.resetFormData();
    },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong !',
          timer: 3000,
          width: '350',
        })
      })
    this.formModal.hide();
  }

  deleteData = (data: any) => {
    console.log(data.id)
    this.http.deleteData(data.id).subscribe(resp => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Record Deleted Sucessfuly',
        showConfirmButton: false,
        timer: 1500,
        width: '350',

      })
    })
    this.getData()
  }

  editData = (data: any) => {
    this.formModal.show();
    this.isAdd = false;
    this.isUpdate = true;


    this.dataObj.id = data.id;
    this.ReactiveForm.patchValue({ title: data.title, description: data.description });
  }

  updateData = () => {
    this.dataObj.title = this.ReactiveForm.value.title;
    this.dataObj.description = this.ReactiveForm.value.description;
    console.log(this.dataObj.id)
    this.http.updatData(this.dataObj, this.dataObj.id).subscribe((resp) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Record Updated Successfully',
        showConfirmButton: false,
        timer: 1500,
        width: '350',

      })
      this.getData();
      this.resetFormData()
    })
    this.formModal.hide();
  }

  resetFormData = () => {
    this.ReactiveForm.patchValue({
      title: "",
      description: ""
    })

  }
  isLogin: boolean = true;

  logOut = () => {

    for (let i = 0; i < this.profileData.length; i++) {
      console.log(this.profileData[i].isLogin)
      if (this.profileData[i].isLogin) {
        this.isLogin = false;
        this.http.profile[i].isLogin = false;
        break;
      }
    }

    if (this.isLogin == false) {
      Swal.fire({ title: 'Logout User Successfully', timer: 1500 })
      this.router.navigate(['/'])
    }
  }

}
