import { Component, OnInit } from '@angular/core';
import {Place} from "../../models/Place";
import {PlaceService} from "../../services/Place.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  places?: Place[];

  constructor(private placeService: PlaceService, private router: Router) {
  }

  ngOnInit(): void {
    if (!(sessionStorage.getItem("token") === "true")) {
      this.router.navigateByUrl("/login")
    }
    this.retrievePlace()
  }

  retrievePlace(): void {
    sessionStorage.setItem("loader", "true");
    // sessionStorage.setItem("loader", "true");
    try {
      this.placeService.getAll()
        .subscribe({
          next: (res) => {
            // @ts-ignore
            this.places = res.data;
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

  removePlace(id: number) {
    sessionStorage.setItem("loader", "true");
    // sessionStorage.setItem("loader", "true");
    try {
      this.placeService.removePlace(id).subscribe({
        next: response => {
          this.retrievePlace();
        },
        error: error => {
        }
      })
    } finally {
      setTimeout(() => {
        sessionStorage.setItem("loader", "false");
        // And any other code that should run only after 5s
      }, 1000);

    }

  }
}
