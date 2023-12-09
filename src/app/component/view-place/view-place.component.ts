import { Component, OnInit } from '@angular/core';
import {Category} from "../../models/Categorymodel";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Offer} from "../../models/Offer";
import {OfferService} from "../../services/Offer.service";
import {PlaceService} from "../../services/Place.service";
import {Place} from "../../models/Place";
import {Slider} from "../../models/Slider";
import {SliderService} from "../../services/slider.service";

@Component({
  selector: 'app-view-place',
  templateUrl: './view-place.component.html',
  styleUrls: ['./view-place.component.css']
})
export class ViewPlaceComponent implements OnInit {

  categories?: Category[];
  sliders?: Slider[];
  place: Place = new Place();
  constructor(private sliderService: SliderService,private categoryService: CategoryService,private placeService: PlaceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(!(sessionStorage.getItem("token") === "true")){
      this.router.navigateByUrl("/login")
    }
    this.getCategory()
    this.retrieveCategory()
    this.retrieveSlider()
  }


  retrieveCategory(): void {
    sessionStorage.setItem("loader", "true");
    // sessionStorage.setItem("loader", "true");
    try {
    this.categoryService.getAll()
      .subscribe({
        next: (res) => {
          // @ts-ignore
          this.categories = res.data;
        },
        error: (e) => console.error(e)
      });
    } finally {
      setTimeout(() => {
        sessionStorage.setItem("loader", "false");
        // And any other code that should run only after 5s
      }, 1500);

    }
  }

  retrieveSlider(): void {
    this.sliderService.getAll()
      .subscribe({
        next: (res) => {
          // @ts-ignore
          this.sliders = res.data;
        },
        error: (e) => console.error(e)
      });
  }
  getCategory(){
    let id = this.route.snapshot.paramMap.get('id');

    this.placeService.getOrderById(id).subscribe(
      data =>{
        // @ts-ignore
        this.place = data.places
      }
    )
  }
  edit(place: Place){
    this.router.navigateByUrl("/place/edit/"+place.id)
  }
}
