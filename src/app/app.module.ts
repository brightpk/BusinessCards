import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { BusinessCardsComponent } from './business-cards/business-cards.component';
import { NewBusinessCardComponent } from './new-business-card/new-business-card.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { BusinesscardsService } from './services/businesscards.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth-guard/auth.guard';

import { WebcamModule } from 'ngx-webcam';
import { WebCamComponent } from './web-cam/web-cam.component';
import { HttpClient } from 'selenium-webdriver/http';
import { WebcamService } from './services/webcam.service';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      LogoutComponent,
      NavBarComponent,
      ProfileComponent,
      DashboardComponent,
      BusinessCardComponent,
      BusinessCardsComponent,
      NewBusinessCardComponent,
      WebCamComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFirestoreModule,
      WebcamModule,
   ],
   providers: [
      BusinesscardsService,
      WebcamService,
      AuthService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
