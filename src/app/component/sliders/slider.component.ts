import { Component, OnInit } from '@angular/core';
import {Slider} from "../../models/Slider";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SliderService} from "../../services/slider.service";

@Component({
  selector: 'app-sliders',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SlidersComponent implements OnInit {

  sliders?: Slider[];

  constructor(private sliderService: SliderService, private router: Router) { }

  ngOnInit(): void {
    if(!(sessionStorage.getItem("token") === "true")){
      this.router.navigateByUrl("/login")
    }
    this.retrieveCategory()
  }

  retrieveCategory(): void {
    sessionStorage.setItem("loader", "true");
    try {
      this.sliderService.getAll()
        .subscribe({
          next: (res) => {
            // @ts-ignore
            this.sliders = res.data;
          },
          error: (e) => console.error(e)
        });
    } finally {
      setTimeout(() => {
        sessionStorage.setItem("loader", "false");
        // And any other code that should run only after 5s
      }, 1000);

    }
  }

  removeCategory(id: number){
    sessionStorage.setItem("loader", "true");
    try {
      this.sliderService.removeSlider(id).subscribe({
        next: response => {
          this.retrieveCategory();
        },
        error: error => {
        }
      })
    } finally {
      setTimeout(() => {
        sessionStorage.setItem("loader", "false");
        // And any other code that should run only after 5s
      }, 1000);

    }
  }

}
