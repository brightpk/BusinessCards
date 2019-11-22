import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BusinessCardsComponent } from './business-cards/business-cards.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewBusinessCardComponent } from './new-business-card/new-business-card.component';
import { SearchBusinessCardsComponent } from './search-business-cards/search-business-cards.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ]},
  { path: 'business-cards', component: DashboardComponent, canActivate: [ AuthGuard ]},
  { path: 'new-business-card', component: NewBusinessCardComponent, canActivate: [ AuthGuard ]},
  {
    path: 'business-cards/searchBy/:searchBy/searchFor/:searchFor',
    component: SearchBusinessCardsComponent,
    canActivate: [ AuthGuard ],
    runGuardsAndResolvers: 'always'
  },
  
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
