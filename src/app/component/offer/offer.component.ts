import { Component, OnInit } from '@angular/core';
import {Offer} from "../../models/Offer";
import {OfferService} from "../../services/Offer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offers?: Offer[];

  constructor(private offerService: OfferService, private router: Router) { }

  ngOnInit(): void {
    if(!(sessionStorage.getItem("token") === "true")){
      this.router.navigateByUrl("/login")
    }
    this.retrieveOffer()
  }

  retrieveOffer(): void {
    sessionStorage.setItem("loader", "true");
    try {
    this.offerService.getAll()
      .subscribe({
        next: (res) => {
          // @ts-ignore
          this.offers = res.data;
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

  removeOffer(id: number){
    sessionStorage.setItem("loader", "true");
      try {
        this.offerService.removeOffer(id).subscribe({
          next: response=> {
            this.retrieveOffer();
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
}
