import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

//user credentials to login
  user:any={
    username : 'admin',
    password: 'admin123'
  }

//to validate the basic requirements of login credentials
  loginFormValidation = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(8)]))

  })
//to show erro msg for username
  get username(){
    return this.loginFormValidation.get('username')
  }
//to show erro msg for password
  get password(){
    return this.loginFormValidation.get('password')
  }

//to validate the user credentials are correct
  validateCredentials(val: any){
    if(this.user.username === val.username && this.user.password === val.password){
      this.router.navigate(['/home']);
 
    }else{
      alert('INVALID USERNAME OR PASSWORD');      
    }
  }

}
