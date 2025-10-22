import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app/app.routes';
import { DarkModeService } from './app/services/dark-mode.services';
bootstrapApplication(App, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)), // router
    importProvidersFrom(ReactiveFormsModule),         // reactive forms
    importProvidersFrom(HttpClientModule),            // ✅ HttpClient provider
  ],
}).catch(err => console.error(err));
