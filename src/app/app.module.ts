import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule, MatDividerModule, MatIconModule, MatListModule,
  MatMenuModule,
  MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { RankingComponent } from './ranking/ranking.component';
import { MainComponent } from './main/main.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
