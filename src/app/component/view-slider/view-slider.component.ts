import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Offer} from "../../models/Offer";
import {Slider} from "../../models/Slider";
import {SliderService} from "../../services/slider.service";
import {Place} from "../../models/Place";
import {PlaceService} from "../../services/Place.service";

@Component({
  selector: 'app-view-slider',
  templateUrl: './view-slider.component.html',
  styleUrls: ['./view-slider.component.css']
})
export class ViewSliderComponent implements OnInit {

  slider: Slider = new Slider();
  places?: Place[];
  constructor(private placeService: PlaceService,private sliderService: SliderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(!(sessionStorage.getItem("token") === "true")){
      this.router.navigateByUrl("/login")
    }
    this.getCategory()
    this.retrievePlace()
  }
  retrievePlace(): void {
    sessionStorage.setItem("loader", "true");
    // sessionStorage.setItem("loader", "true");
    try {
    this.placeService.getAll()
      .subscribe({
        next: (res) => {
          // @ts-ignore
          this.places = res.data;
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


  getCategory(){
    let id = this.route.snapshot.paramMap.get('id');

    this.sliderService.getOrderById(id).subscribe(
      data =>{
        // @ts-ignore
        this.slider = data.data
      }
    )
  }
  edit(slider: Slider){
    this.router.navigateByUrl("/slider/edit/"+slider.id)
  }
}
