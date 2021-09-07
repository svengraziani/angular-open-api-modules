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

import {
  NoRequestFiltering,
  RegistryLoadingInterceptorModule, REQUEST_FILTER,
  REQUEST_ID_GENERATOR,
  UrlFragmentIdGenerator
} from '@anexia/registry-loading-interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PetStoreDataAccessModule,
    ReactiveFormsModule,
    RegistryLoadingInterceptorModule

  ],
  providers: [
    {provide: BASE_PATH, useValue: 'https://petstore3.swagger.io/api/v3'},
    {provide: REQUEST_ID_GENERATOR, useValue: new UrlFragmentIdGenerator() },
    {provide: REQUEST_FILTER, useValue: new NoRequestFiltering()}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
