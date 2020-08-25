import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';
import { CabComponent} from "./components/cab/cab.component";
import { CommercialComponent} from "./components/commercial/commercial.component";
import { EmployeeComponent} from "./components/employee/employee.component";
import { DialogComponent } from "./components/cab/dialog/dialog.component";
import { ErrordialogComponent } from "./components/cab/errordialog/errordialog.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrordialogcommercialComponent } from './components/commercial/errordialogcommercial/errordialogcommercial.component';


@NgModule({
  declarations: [
    AppComponent,
    CabComponent,
    CommercialComponent,
    EmployeeComponent,
    DialogComponent,
    ErrordialogComponent,
    ErrordialogcommercialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
