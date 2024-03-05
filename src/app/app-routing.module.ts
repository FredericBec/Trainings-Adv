import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { CartComponent } from './components/cart/cart.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {path : 'trainings', component : TrainingsComponent},
  { path : 'cart' , component : CartComponent },
  {path : 'customer', component : CustomerComponent},
  {path : 'order', component : OrderComponent},
  {path : '', redirectTo : 'trainings', pathMatch : 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
