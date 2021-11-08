
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './views/home/home.component';
import { TableComponent } from './components/table/table.component';
import { TableBodyComponent } from './components/table-body/table-body.component';
import { BillViewComponent } from './views/bill-view/bill-view.component';
import { CreateBillComponent } from './components/create-bill/create-bill.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { DetailProductsComponent } from './components/detail-products/detail-products.component';
import { DetailAmountsComponent } from './components/detail-amounts/detail-amounts.component';
import { ReviewBillComponent } from './components/review-bill/review-bill.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    TableComponent,
    TableBodyComponent,
    BillViewComponent,
    CreateBillComponent,
    CreateProductComponent,
    DetailProductsComponent,
    DetailAmountsComponent,
    ReviewBillComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule 
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }