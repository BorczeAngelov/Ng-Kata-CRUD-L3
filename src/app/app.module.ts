import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductData } from './products/product-data';
import { ProductListComponent } from './products/product-list/product-list.component';
import { productReducer } from './products/state/product.reducer';
import { ProductEffects } from './products/state/product.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ProductData),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
