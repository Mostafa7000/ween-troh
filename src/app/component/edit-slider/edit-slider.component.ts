import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Slider} from "../../models/Slider";
import {SliderService} from "../../services/slider.service";
import {AwsService} from "../../services/aws.service";
import {Place} from "../../models/Place";
import {PlaceService} from "../../services/Place.service";

@Component({
  selector: 'app-edit-slider',
  templateUrl: './edit-slider.component.html',
  styleUrls: ['./edit-slider.component.css']
})
export class EditSliderComponent implements OnInit {

  slider: Slider = new Slider();
  places?: Place[];
  selectedFilesImage: FileList | undefined;
  constructor(private placeService: PlaceService,private aws: AwsService,private sliderService: SliderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(!(sessionStorage.getItem("token") === "true")){
      this.router.navigateByUrl("/login")
    }
    this.getSlider()
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



  getSlider(){
    sessionStorage.setItem("loader", "true");
    // sessionStorage.setItem("loader", "true");
    try {
    let id = this.route.snapshot.paramMap.get('id');

    this.sliderService.getOrderById(id).subscribe(
      data =>{
        // @ts-ignore
        this.slider = data.data
      }
    )
    } finally {
      setTimeout(() => {
        sessionStorage.setItem("loader", "false");
        // And any other code that should run only after 5s
      }, 1000);

    }
  }

  addSlider(slider: Slider){
    sessionStorage.setItem("loader", "true");
    // sessionStorage.setItem("loader", "true");
    try {
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
    } finally {
      setTimeout(() => {
        sessionStorage.setItem("loader", "false");
        // And any other code that should run only after 5s
      }, 1000);

    }
  }

  selectImage(event: Event) {
    // @ts-ignore
    // alert(event.target.files.item(0))
    // @ts-ignore

    this.selectedFilesImage = event.target.files;
    // this.category.fileImage = event.target.files.item(0);
  }
}
