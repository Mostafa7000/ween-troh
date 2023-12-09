import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Category} from "../../models/Categorymodel";
import {CategoryService} from "../../services/category.service";
import {Offer} from "../../models/Offer";
import {OfferService} from "../../services/Offer.service";
import {Place} from "../../models/Place";
import {PlaceService} from "../../services/Place.service";
import {SliderService} from "../../services/slider.service";
import {Slider} from "../../models/Slider";
import {AwsService} from "../../services/aws.service";

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {

  categories?: Category[];
  sliders?: Slider[];
  place: Place = new Place();
  selectedFilesImage: FileList | undefined;
  selectedFilesIcon: FileList | undefined;
  constructor(private aws: AwsService,private sliderService: SliderService,private categoryService: CategoryService,private placeService: PlaceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(!(sessionStorage.getItem("token") === "true")){
      this.router.navigateByUrl("/login")
    }
    this.getPlace()
    this.retrieveCategory()
    this.retrieveSlider()
  }


  retrieveCategory(): void {

    this.categoryService.getAll()
      .subscribe({
        next: (res) => {
          // @ts-ignore
          this.categories = res.data;
        },
        error: (e) => console.error(e)
      });

  }
  getPlace(){
    sessionStorage.setItem("loader", "true");
    // sessionStorage.setItem("loader", "true");
    try {
    let id = this.route.snapshot.paramMap.get('id');

    this.placeService.getOrderById(id).subscribe(
      data =>{
        // @ts-ignore
        this.place = data.places
      }
    )
    } finally {
      setTimeout(() => {
        sessionStorage.setItem("loader", "false");
        // And any other code that should run only after 5s
      }, 1000);

    }
  }

  addPlace(place: Place){
      sessionStorage.setItem("loader", "true");
      // sessionStorage.setItem("loader", "true");
      try {
    this.placeService.addPlace(place).subscribe({
      next: response=> {
        // @ts-ignore
        this.aws.pushFileToPlaceStorage(this.selectedFilesImage?.item(0), this.selectedFilesIcon?.item(0), response.id).subscribe({
          next: res => {
            // @ts-ignore
            this.router.navigateByUrl("/place")
          },
          error: error =>{
            console.log(error)
          }
        });
        // this.router.navigateByUrl("/place")
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
  selectIcon(event: Event) {
    // @ts-ignore
    this.selectedFilesIcon = event.target.files;
    // this.category.fileIcon = event.target.files.item(0);
  }
}
