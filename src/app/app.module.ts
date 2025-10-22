// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Required for [formGroup]
import { AppComponent } from './app.component';
import { ProfileComponent2 } from './profile/profile'; // adjust path

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
     AppComponent,
    ProfileComponent2  // Import ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
