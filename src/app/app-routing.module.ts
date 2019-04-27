import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RankingComponent} from './ranking/ranking.component';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: MainComponent
  },
  {
    path: 'ranks', component: RankingComponent
  },
  // TODO user details, project details
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
