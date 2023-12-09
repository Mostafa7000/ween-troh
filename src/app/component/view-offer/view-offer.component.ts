import { Component, OnInit } from '@angular/core';
import {Category} from "../../models/Categorymodel";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Offer} from "../../models/Offer";
import {OfferService} from "../../services/Offer.service";
import {Place} from "../../models/Place";
import {Slider} from "../../models/Slider";
import {PlaceService} from "../../services/Place.service";
import {SliderService} from "../../services/slider.service";

@Component({
  selector: 'app-view-offer',
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.css']
})
export class ViewOfferComponent implements OnInit {

  places?: Place[];
  sliders?: Slider[];
  offer: Offer = new Offer();
  constructor(private placeService: PlaceService,private sliderService: SliderService, private offerService: OfferService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(!(sessionStorage.getItem("token") === "true")){
      this.router.navigateByUrl("/login")
    }
    this.getCategory()
    this.retrieveSlider()
    this.retrievePlace()
  }



  getCategory(){
    sessionStorage.setItem("loader", "true");
    // sessionStorage.setItem("loader", "true");
    try {
    let id = this.route.snapshot.paramMap.get('id');

    this.offerService.getOrderById(id).subscribe(
      data =>{
        // @ts-ignore
        this.offer = data.offerDto
      }
    )
    } finally {
      setTimeout(() => {
        sessionStorage.setItem("loader", "false");
        // And any other code that should run only after 5s
      }, 1000);

    }
  }
  edit(offer: Offer){
    this.router.navigateByUrl("/offer/edit/"+offer.id)
  }

  retrievePlace(): void {
    this.placeService.getAll()
      .subscribe({
        next: (res) => {
          // @ts-ignore
          this.places = res.data;
        },
        error: (e) => console.error(e)
      });
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
}
