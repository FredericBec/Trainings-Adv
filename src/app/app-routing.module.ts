import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { CartComponent } from './components/cart/cart.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './components/admin.guard';
import { TrainingComponent } from './components/training/training.component';
import { UserGuard } from './components/user.guard';

const routes: Routes = [
  {path : 'trainings', component : TrainingsComponent},
  { path : 'cart' , component : CartComponent },
  {path : 'customer', component : CustomerComponent, canActivate : [UserGuard]},
  {path : 'order', component : OrderComponent, canActivate : [UserGuard]},
  {path : 'admin', component : AdminComponent, canActivate : [AdminGuard]},
  {path : 'training', component : TrainingComponent, canActivate : [AdminGuard]},
  {path : 'training/:id', component : TrainingComponent, canActivate : [AdminGuard]},
  {path : 'login', component : LoginComponent},
  {path : 'logout', component : LogoutComponent},
  {path : '', redirectTo : 'trainings', pathMatch : 'full'},
  {path : '404', component : PageNotFoundComponent},
  {path : '**', redirectTo : '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
