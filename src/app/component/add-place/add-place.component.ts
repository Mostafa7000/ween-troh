import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Place} from "../../models/Place";
import {PlaceService} from "../../services/Place.service";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/Categorymodel";
import {SliderService} from "../../services/slider.service";
import {Slider} from "../../models/Slider";
import {AwsService} from "../../services/aws.service";

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent {

  categories?: Category[];
  sliders?: Slider[];
  selectedFilesImage: FileList | undefined;
  selectedFilesIcon: FileList | undefined;

  place: Place = new Place();

  constructor(private aws: AwsService,private sliderService: SliderService,private categoryService: CategoryService,private placeService: PlaceService, private router: Router) { }

  ngOnInit(): void {
    if(!(sessionStorage.getItem("token") === "true")){
      this.router.navigateByUrl("/login")
    }
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

  addSlider(place: Place){

    this.placeService.addPlace(place).subscribe({
      next: response=> {

        // this.router.navigateByUrl("/category")
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
