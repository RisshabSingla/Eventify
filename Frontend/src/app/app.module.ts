import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './components/shared/footer/footer.component';
import { AdminNavBarComponent } from './components/shared/navbar/admin-nav-bar/admin-nav-bar.component';
import { UserNavBarComponent } from './components/shared/navbar/user-nav-bar/user-nav-bar.component';
import { HomeNavBarComponent } from './components/shared/navbar/home-nav-bar/home-nav-bar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AdminNavBarComponent,
    UserNavBarComponent,
    HomeNavBarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
