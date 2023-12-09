import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/Categorymodel";
import {AwsService} from "../../services/aws.service";
import {config} from "rxjs";

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent {

  category: Category = new Category();
  selectedFilesImage: FileList | undefined;
  selectedFilesIcon: FileList | undefined;
  constructor(private categoryService: CategoryService, private aws: AwsService, private router: Router) { }

  ngOnInit(): void {
    if(!(sessionStorage.getItem("token") === "true")){
      this.router.navigateByUrl("/login")
    }
  }

  async addCategory(category: Category){
    this.categoryService.addCategory(category).subscribe({
      next: response=> {
        // this.router.navigateByUrl("/category")
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
