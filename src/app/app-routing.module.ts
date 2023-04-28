import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './pages/results/results.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },

  {
    path: 'results/:teamCode',
    component: ResultsComponent,
  },
  {
    path: '**',
    redirectTo: 'search',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
