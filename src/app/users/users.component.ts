import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: User[];
  currentUser!: User | any;

  modalType!: number;
  showModal: boolean = false;

  constructor(
    private ds: DataService,
  ) { 
  }

  ngOnInit(): void {
    this.users = this.ds.getUsers();
  }

  closeModal(){
    this.modalType = 0;
    this.currentUser = null;
    setTimeout(() => {
      this.showModal = false;    
    }, 0);
  }

  openModal(type: number, ...args: any){
    this.modalType = type;

    if(args[0]){
      this.currentUser = args[0];
    }
    else{
      this.currentUser = null;
    }
    this.showModal = true;
  }

}
