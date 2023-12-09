import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Category} from "../../models/Categorymodel";
import {CategoryService} from "../../services/category.service";
import {AwsService} from "../../services/aws.service";

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  category: Category = new Category();
  selectedFilesImage: FileList | undefined;
  selectedFilesIcon: FileList | undefined;
  constructor(private aws: AwsService,private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(!(sessionStorage.getItem("token") === "true")){
      this.router.navigateByUrl("/login")
    }
    this.getCategory()
  }



  getCategory(){
    sessionStorage.setItem("loader", "true");
    // sessionStorage.setItem("loader", "true");
    try {
    let id = this.route.snapshot.paramMap.get('id');

    this.categoryService.getOrderById(id).subscribe(
      data =>{
        // @ts-ignore
        this.category = data.data
      }
    )
    } finally {
      setTimeout(() => {
        sessionStorage.setItem("loader", "false");
        // And any other code that should run only after 5s
      }, 1000);

    }
  }
  addCategory(category: Category){
      sessionStorage.setItem("loader", "true");
      // sessionStorage.setItem("loader", "true");
      try {
    // @ts-ignore
    this.categoryService.addCategory(category).subscribe({
      next: response=> {
        // @ts-ignore
        this.aws.pushFileToCategoryStorage(this.selectedFilesImage?.item(0), this.selectedFilesIcon?.item(0), response.id).subscribe({
          next: res => {
            // @ts-ignore
            this.router.navigateByUrl("/category")
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
  selectIcon(event: Event) {
    // @ts-ignore
    this.selectedFilesIcon = event.target.files;
    // this.category.fileIcon = event.target.files.item(0);
  }
}
