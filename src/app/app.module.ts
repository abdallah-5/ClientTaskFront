import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { GridModule } from "@progress/kendo-angular-grid";
import { BrowserModule } from '@angular/platform-browser';
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ClientsComponent } from "./Components/Clients/clients/clients.component";
import { ClientFormComponent } from './Components/Clients/client-form/client-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    GridModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }