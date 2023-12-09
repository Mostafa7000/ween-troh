import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Slider} from "../../models/Slider";
import {SliderService} from "../../services/slider.service";
import {AwsService} from "../../services/aws.service";
import {PlaceService} from "../../services/Place.service";
import {Place} from "../../models/Place";

@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrls: ['./add-slider.component.css']
})
export class AddSliderComponent {

  slider: Slider = new Slider();
  places?: Place[];
  selectedFilesImage: FileList | undefined;
  constructor(private placeService: PlaceService, private sliderService: SliderService,private aws: AwsService, private router: Router) { }

  ngOnInit(): void {
    if(!(sessionStorage.getItem("token") === "true")){
      this.router.navigateByUrl("/login")
    }
    this.retrievePlace()
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

  addSlider(slider: Slider){

    this.sliderService.addSlider(slider).subscribe({
      next: response=> {
        // @ts-ignore
        this.aws.pushFileToSliderStorage(this.selectedFilesImage?.item(0), response.id).subscribe({
          next: res => {
            // @ts-ignore
            this.router.navigateByUrl("/slider")
          },
          error: error =>{
            console.log(error)
          }
        });
      },
      error: error =>{
      }
    })
  }

  selectImage(event: Event) {
    // @ts-ignore
    // alert(event.target.files.item(0))
    // @ts-ignore

    this.selectedFilesImage = event.target.files;
    // this.category.fileImage = event.target.files.item(0);
  }
}
