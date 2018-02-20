import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';

import { AppComponent } from 'app/app.component';
import { HomeComponent } from './home/home.component';
import { AppRouterConfig } from 'app/app.router-config';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { GridComponent } from './grid/grid.component';
import { CMService } from './cm.service';
import { ColormgFilterPipe } from './shared/color-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MainComponent,
    GridComponent,
    ColormgFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRouterConfig,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [CMService],
  bootstrap: [AppComponent]
})
export class AppModule { }
