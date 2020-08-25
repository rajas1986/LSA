import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from "../components/employee/employee.component";
import { CabComponent } from "../components/cab/cab.component";
import { CommercialComponent } from "../components/commercial/commercial.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'employee' },
  // { path: '', pathMatch: 'full', redirectTo: 'survey' },
  { path: 'employee', component: EmployeeComponent },
  { path: 'cab', component: CabComponent },
  { path: 'commercial', component: CommercialComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
})
export class RoutingModule {}