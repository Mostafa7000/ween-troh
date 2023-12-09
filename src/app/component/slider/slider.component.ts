import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {SliderService} from "../../services/slider.service";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  constructor(private router: Router) { }


  ngOnInit(): void {
    if(!(sessionStorage.getItem("token") === "true")){
      this.router.navigateByUrl("/login")
    }
  }

  goToShowing() {
    this.router.navigateByUrl("/showing")
  }

  goToAdding() {
    this.router.navigateByUrl("/adding")
  }
}
