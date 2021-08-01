import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  error : any = null;

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  get fc() {
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    
    if(this.loginForm.invalid){
      this.error='Plese fill all the required details';
      return;
    }

    let val = this.loginForm.value;

    if(val.username == 'admin'){
      if(val.password == 'test'){
        localStorage.setItem('user_logged', 'yes');
        this.route.navigateByUrl('/app/users');
      }
      else{
        this.error = 'Invalid password';
      }
    }
    else{
      this.error = 'User not found';
    }
  }

}
