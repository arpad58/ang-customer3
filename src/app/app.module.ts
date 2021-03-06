import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { CustomerListComponent } from './page/customer-list/customer-list.component';
import { CustomerEditorComponent } from './page/customer-editor/customer-editor.component';
import { FilterPipe } from './pipe/filter.pipe';
import { SorterPipe } from './pipe/sorter.pipe';
import { CustomerUpdateComponent } from './page/customer-update/customer-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomerListComponent,
    CustomerEditorComponent,
    FilterPipe,
    SorterPipe,
    CustomerUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
