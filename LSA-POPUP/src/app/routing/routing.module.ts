import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "../home/home.component";
import { PageNotFoundComponent } from '../page-not-found/page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: `lsa` },
  { path: `:id`, component:  HomeComponent},
  { path: '**', component:PageNotFoundComponent  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
})
export class RoutingModule {}