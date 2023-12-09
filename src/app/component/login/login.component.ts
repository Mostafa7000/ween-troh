import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  email: string = '';
  password: string = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("token") === "true"){
      this.router.navigateByUrl("/start")
    }
  }

  logIn(){
    if(this.email === 'admin@admin.com' && this.password === 'admin@123'){
      // if(this.email === '1' && this.password === '1'){
      sessionStorage.setItem("token", "true")
      this.router.navigateByUrl("/start")
    } else {
      alert("Invalid user name and password")
    }
  }
}
