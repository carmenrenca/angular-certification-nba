import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule  } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { CardTeamComponent } from './pages/search/cards-item/card-team.component';
import { ResultsComponent } from './pages/results/results.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultsComponent,
    CardTeamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
