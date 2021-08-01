import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    usersData : User[] = [
      {
          _id: 1,
          firstName: 'arun',
          middleName: 'siva',
          lastName: 'kumar',
          emailID: 'arunkumar@test.com',
          mobile: 1234567890,
          gender: 'Male',
          dob: '1996-12-11',
          address: '12, new street, madurai city',
          cob: 'India',
          status:true
      },
      {
          _id: 2,
          firstName: 'kalaiselvi',
          middleName: '',
          lastName: 'kannan',
          emailID: 'kalaiselvikannan@test.com',
          mobile: 1234567890,
          gender: 'Female',
          dob: '1982-02-21',
          address: '35, old street, trichy city',
          cob: 'India',
          status:true
      },
      {
        _id: 3,
        firstName: 'mani',
        middleName: '',
        lastName: 'selvam',
        emailID: 'maniselvam@test.com',
        mobile: 1234567890,
        gender: 'Male',
        dob: '1992-05-01',
        address: '5/23, main road, sivagangai',
        cob: 'India',
        status:true
    }
  ]

  constructor(
  ) { }

  getUsers(){
    return this.usersData;
  }

  addUser(data: User): Promise<boolean>{
    return new Promise((resolve) => {
      data._id = this.usersData.length + 1;
      this.usersData.push(data);
      resolve(true);
    })
  }

  updateUser(data: User): Promise<boolean>{
    return new Promise((resolve, reject) => {
      let i = this.usersData.findIndex((x: User) => {
        return data._id === x._id;
      });  
      if(i){
        this.usersData[i] = data;
        resolve(true);
      }
      else{
        reject(false);
      }  
    });
  }
}
