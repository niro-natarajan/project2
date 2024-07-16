import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HotclassicsComponent } from './hotclassics/hotclassics.component';
import { MatCardModule } from '@angular/material/card';
// import { MatExpansionModule } from '@angular/material/expansion';
import { ColdcoffeeComponent } from './coldcoffee/coldcoffee.component';
// import { CoffeenavComponent } from './coffeenav/coffeenav.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DescriptionComponent } from './description/description.component';
import { CartComponent } from './cart/cart.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/cart/cart.reducer';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CheckoutComponent } from './checkout/checkout.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { HomeloginComponent } from './homelogin/homelogin.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import {MatSelectModule} from '@angular/material/select';
// import { LogComponent } from './log/log.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { PaymentComponent } from './payment/payment.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms'; 





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    HotclassicsComponent,
    ColdcoffeeComponent,
    // CoffeenavComponent,
    DescriptionComponent,
    CartComponent,
    CheckoutComponent,
    HomeloginComponent,
    OrderhistoryComponent,
    PaymentComponent,
    // LogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    StoreModule.forRoot({ cart: cartReducer }),
    MatTableModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatBadgeModule,
    MatSelectModule,
    MatExpansionModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
