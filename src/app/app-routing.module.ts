import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillViewComponent } from './views/bill-view/bill-view.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'bill-view/:action', component: BillViewComponent},
  {path: 'bill-view/:action/:id', component: BillViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
