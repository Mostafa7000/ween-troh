import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {NgbCollapse, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { SliderLeftComponent } from './component/slider-left/slider-left.component';
import { AppNavigationComponent } from './component/app-navigation/app-navigation.component';
import {AppComponent} from "./app.component";
import { LayoutComponent } from './component/layout/layout.component';
import { SliderComponent } from './component/slider/slider.component';
import { AllProcessComponent } from './component/all-process/all-process.component';
import {AppRoutingModule} from "./app-routing.module";
import { AllProcessShowComponent } from './component/all-process-show/all-process-show.component';
import { PlaceComponent } from './component/place/place.component';
import { OfferComponent } from './component/offer/offer.component';
import { TutorialsListComponent } from './component/tutorials-list/tutorials-list.component';
import {SlidersComponent} from "./component/sliders/slider.component";
import {AddOfferComponent} from "./component/add-Offer/add-offer.component";
import {AddSliderComponent} from "./component/add-slider/add-slider.component";
import {AddPlaceComponent} from "./component/add-place/add-place.component";
import {AddTutorialComponent} from "./component/add-tutorial/add-tutorial.component";
import {ViewSliderComponent} from "./component/view-slider/view-slider.component";
import {ViewCategoryComponent} from "./component/view-category/view-category.component";
import {ViewPlaceComponent} from "./component/view-place/view-place.component";
import {ViewOfferComponent} from "./component/view-offer/view-offer.component";
import {TutorialDetailsComponent} from "./component/tutorial-details/tutorial-details.component";
import {EditSliderComponent} from "./component/edit-slider/edit-slider.component";
import {EditPlaceComponent} from "./component/edit-place/edit-place.component";
import {EditOfferComponent} from "./component/edit-offer/edit-offer.component";
import { StartComponent } from './component/start/start.component';
import { LoginComponent } from './component/login/login.component';
import { LoaderComponent } from './component/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderLeftComponent,
    AppNavigationComponent,
    LayoutComponent,
    SliderComponent,
    AllProcessComponent,
    AllProcessShowComponent,
    TutorialsListComponent,
    PlaceComponent,
    SliderComponent,
    SlidersComponent,
    OfferComponent,
    AddSliderComponent,
    AddPlaceComponent,
    AddOfferComponent,
    AddTutorialComponent,
    ViewOfferComponent,
    ViewPlaceComponent,
    ViewCategoryComponent,
    ViewSliderComponent,
    EditOfferComponent,
    EditPlaceComponent,
    EditSliderComponent,
    TutorialDetailsComponent,
    StartComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbCollapse,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    // RouterOutlet,
    // RouterLink,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
