import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { HotclassicsComponent } from './hotclassics/hotclassics.component';
import { ColdcoffeeComponent } from './coldcoffee/coldcoffee.component';
import { CoffeenavComponent } from './coffeenav/coffeenav.component';
import { DescriptionComponent } from './description/description.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeloginComponent } from './homelogin/homelogin.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
// import { LogComponent } from './log/log.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'About Us', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'hot', component: HotclassicsComponent },
  { path: 'cold', component: ColdcoffeeComponent },
  // { path: 'coffeenav', component: CoffeenavComponent },
  { path: 'description', component: DescriptionComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  // { path: 'log', component: LogComponent },
  { path: 'homelogin', component: HomeloginComponent },
  { path: "orderhistory", component: OrderhistoryComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
