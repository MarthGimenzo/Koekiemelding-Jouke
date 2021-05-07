import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HandsComponent } from './hands/hands.component';

@NgModule({
            declarations: [
              AppComponent,
              HandsComponent
            ],
            imports:      [
              BrowserModule,
              AppRoutingModule
            ],
            providers:    [],
            bootstrap:    [AppComponent]
          })
export class AppModule {
}
