import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  ApiModule as PetStoreDataAccessModule,
  BASE_PATH
} from 'pet-store-data-access';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PetStoreDataAccessModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: BASE_PATH, useValue: 'https://petstore3.swagger.io/api/v3'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
