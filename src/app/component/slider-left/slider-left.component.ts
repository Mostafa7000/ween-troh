import { Component } from '@angular/core';
import {SliderService} from "../../services/slider.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-slider-left',
  templateUrl: './slider-left.component.html',
  styleUrls: ['./slider-left.component.scss']
})
export class SliderLeftComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!(sessionStorage.getItem("token") === "true")){
      this.router.navigateByUrl("/login")
    }
  }
}
