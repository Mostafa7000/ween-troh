import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Category} from "../../models/Categorymodel";
import {CategoryService} from "../../services/category.service";
import {Offer} from "../../models/Offer";
import {OfferService} from "../../services/Offer.service";
import {PlaceService} from "../../services/Place.service";
import {SliderService} from "../../services/slider.service";
import {Place} from "../../models/Place";
import {Slider} from "../../models/Slider";
import {AwsService} from "../../services/aws.service";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {

  offer: Offer = new Offer();
  places?: Place[];
  sliders?: Slider[];
  selectedFilesImage: FileList | undefined;

  constructor(private aws: AwsService,private placeService: PlaceService,private sliderService: SliderService,private categoryService: OfferService, private router: Router, private route: ActivatedRoute) { }

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

    this.categoryService.getOrderById(id).subscribe(
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
  addOffer(category: Category){
    sessionStorage.setItem("loader", "true");
    // sessionStorage.setItem("loader", "true");
    try {
    this.categoryService.addOffer(category).subscribe({
      next: response=> {
        // @ts-ignore
        this.aws.pushFileToOfferStorage(this.selectedFilesImage?.item(0), response.id).subscribe({
          next: res => {
            // @ts-ignore
            this.router.navigateByUrl("/offer")
          },
          error: error =>{
            console.log(error)
          }
        });
        // this.router.navigateByUrl("/offer")
      },
      error: error =>{
      }
    })
    } finally {
      setTimeout(() => {
        sessionStorage.setItem("loader", "false");
        // And any other code that should run only after 5s
      }, 1000);

    }
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

  selectImage(event: Event) {
    // @ts-ignore
    // alert(event.target.files.item(0))
    // @ts-ignore

    this.selectedFilesImage = event.target.files;
    // this.category.fileImage = event.target.files.item(0);
  }
}
