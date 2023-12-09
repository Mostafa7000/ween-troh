import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router) { }

  getLogin(){
    return sessionStorage.getItem("token") === "true";
  }
  ngOnInit(): void {
    // if(sessionStorage.getItem("token") === "true"){
    //   //this.router.navigateByUrl("/login")
    // } else {
    //   //this.router.navigateByUrl("/start")
    // }
  }

  getLoader() {
    return sessionStorage.getItem("loader") === "true";
  }
}
