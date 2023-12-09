import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllProcessComponent} from "./component/all-process/all-process.component";
import {AllProcessShowComponent} from "./component/all-process-show/all-process-show.component";
import {OfferComponent} from "./component/offer/offer.component";
import {PlaceComponent} from "./component/place/place.component";
import {TutorialsListComponent} from "./component/tutorials-list/tutorials-list.component";
import {SlidersComponent} from "./component/sliders/slider.component";
import {AddTutorialComponent} from "./component/add-tutorial/add-tutorial.component";
import {AddSliderComponent} from "./component/add-slider/add-slider.component";
import {AddPlaceComponent} from "./component/add-place/add-place.component";
import {AddOfferComponent} from "./component/add-Offer/add-offer.component";
import {ViewCategoryComponent} from "./component/view-category/view-category.component";
import {ViewSliderComponent} from "./component/view-slider/view-slider.component";
import {ViewPlaceComponent} from "./component/view-place/view-place.component";
import {ViewOfferComponent} from "./component/view-offer/view-offer.component";
import {TutorialDetailsComponent} from "./component/tutorial-details/tutorial-details.component";
import {EditSliderComponent} from "./component/edit-slider/edit-slider.component";
import {EditPlaceComponent} from "./component/edit-place/edit-place.component";
import {EditOfferComponent} from "./component/edit-offer/edit-offer.component";
import {StartComponent} from "./component/start/start.component";
import {LoginComponent} from "./component/login/login.component";

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  // { path: 'category/:id', component: TutorialsListComponent },
  { path: 'adding', component: AllProcessComponent },
  { path: 'showing', component: AllProcessShowComponent },
  { path: 'category', component: TutorialsListComponent },
  { path: 'slider', component: SlidersComponent },
  { path: 'place', component: PlaceComponent },
  { path: 'offer', component: OfferComponent },
  { path: 'category/add', component: AddTutorialComponent },
  { path: 'slider/add', component: AddSliderComponent },
  { path: 'place/add', component: AddPlaceComponent },
  { path: 'offer/add', component: AddOfferComponent },
  { path: 'category/edit/:id', component: TutorialDetailsComponent },
  { path: 'category/view/:id', component: ViewCategoryComponent },
  { path: 'slider/edit/:id', component: EditSliderComponent },
  { path: 'slider/view/:id', component: ViewSliderComponent },
  { path: 'place/edit/:id', component: EditPlaceComponent },
  { path: 'place/view/:id', component: ViewPlaceComponent },
  { path: 'offer/edit/:id', component: EditOfferComponent },
  { path: 'offer/view/:id', component: ViewOfferComponent },
  { path: 'start', component: StartComponent },
  // { path: 'add', component: AddTutorialComponent },
  // { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'start', pathMatch: 'full' },
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: '**', redirectTo: 'start', pathMatch: 'full' },
  { path: '', redirectTo: 'start', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
