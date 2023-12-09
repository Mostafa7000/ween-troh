import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import {Router} from "@angular/router";
import {Category} from "../../models/Categorymodel";

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  categories?: Category[];

  constructor(private categoryService: CategoryService, private router: Router) {
  }

  ngOnInit(): void {
    if (!(sessionStorage.getItem("token") === "true")) {
      this.router.navigateByUrl("/login")
    }
    this.retrieveCategory()
  }

  retrieveCategory(): void {
    sessionStorage.setItem("loader", "true");
    // sessionStorage.setItem("loader", "true");
    try {
      this.categoryService.getAll()
        .subscribe({
          next: (res) => {
            // @ts-ignore
            this.categories = res.data;
          },
          error: (e) => console.error(e)
        });

    } finally {
      setTimeout(() => {
        sessionStorage.setItem("loader", "false");
        // And any other code that should run only after 5s
      }, 1000);

    }
  }

  removeCategory(id: number) {
    sessionStorage.setItem("loader", "true");
    // sessionStorage.setItem("loader", "true");
    try {
      this.categoryService.removeCategory(id).subscribe({
        next: response => {
          this.retrieveCategory();
        },
        error: error => {
        }
      })
    } finally {
      setTimeout(() => {
        sessionStorage.setItem("loader", "false");
        // And any other code that should run only after 5s
      }, 500);

    }
  }
}
