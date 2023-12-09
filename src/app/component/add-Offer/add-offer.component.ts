import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Offer} from "../../models/Offer";
import {OfferService} from "../../services/Offer.service";
import {SliderService} from "../../services/slider.service";
import {PlaceService} from "../../services/Place.service";
import {Place} from "../../models/Place";
import {Slider} from "../../models/Slider";
import {AwsService} from "../../services/aws.service";
@Component({
  selector: 'app-add-slider',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent {

  offer: Offer = new Offer();
  places?: Place[];
  sliders?: Slider[];
  selectedFilesImage: FileList | undefined;
  constructor(private aws: AwsService,private placeService: PlaceService,private sliderService: SliderService,private offerService: OfferService, private router: Router) { }

  ngOnInit(): void {
    if(!(sessionStorage.getItem("token") === "true")){
      this.router.navigateByUrl("/login")
    }
    this.retrieveSlider()
    this.retrievePlace()
  }

  addOffer(offer: Offer){
    
    this.offerService.addOffer(offer).subscribe({
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
