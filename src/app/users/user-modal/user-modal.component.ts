import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  @Input()
  currentUser!: User | any;

  @Input()
  modalType!: number;

  @Output()
  closeModal = new EventEmitter<any>();

  today : any = new Date()
  genders: any = ['Male', 'Female', 'Others'];
  countries: any = ['India', 'Singapore', 'Malaysia', 'USA', 'UK'];

  submitted: boolean = false;
  error : any = null;
  userForm!: FormGroup;
  

  constructor(
    private ds: DataService,
    private fb: FormBuilder
  ) { 
  }

  ngOnInit(): void {
    this.openModal()
  }

  buildForm(){
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      emailID: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dob: ['', [Validators.required, Validators.max(this.today)]],
      address: ['', Validators.required],
      cob: ['', Validators.required],
      status: [false, Validators.requiredTrue],
    });
  }

  closeModalEmit(){
    this.closeModal.emit();
    // this.currentUser = null;
  }

  openModal(){

    this.buildForm();

    if(this.currentUser){
      let data = this.currentUser;
      for(let k of Object.keys(data)){
        if(k != '_id')
        this.userForm.controls[k].setValue(data[k]); 
      }
    }
    else{
      this.currentUser = null;
    }
  }

  get fc(){
    return this.userForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.userForm.invalid){
      this.error='Plese fill all the required details';
      return;
    }

    let val = this.userForm.value;
    switch (this.modalType) {
      case 1:
          this.ds.addUser(val).then(
            (res: any) => {
              if(res){
                alert('Added successfully!');
                this.closeModal.emit();
              }
              else{
                alert('Failed to add!');              
              }
            }
          ).catch((err: any) => {
            this.error = err;
          });
        break;
      case 2:
          val._id = this.currentUser._id;
          this.ds.updateUser(val).then(
            (res: any) => {
              if(res){
                alert('Updated successfully!');
                this.closeModal.emit();
              }
              else{
                alert('Failed to update!');              
              }
            }
          ).catch((err: any) => {
            this.error = err;
          });
          break
      default:
        alert('Something went wrong!')
        break;
    }
  }

}
