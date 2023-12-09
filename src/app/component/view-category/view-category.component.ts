import { Component, OnInit } from '@angular/core';
import {Category} from "../../models/Categorymodel";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  category: Category = new Category();
  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) { }

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
  edit(category: Category){
    this.router.navigateByUrl("/category/edit/"+category.id)
  }
}
