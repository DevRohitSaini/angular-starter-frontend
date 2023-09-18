import { Route } from "@angular/router";
import { SettingComponent } from "./setting.component";
import { PaymentComponent } from "./payment/payment.component";
import { ProfileComponent } from "./profile/profile.component";

export const SettingRoute: Route[] = [
  {
    path: '',
    component: SettingComponent,
    children : [ 
      {
        path:'',
        pathMatch: 'full',
        component: PaymentComponent
      }, 
      {
        path:'payment',
        component: PaymentComponent
      },    
      {
        path:'profile',
        component: ProfileComponent
      }      
    ]
  }
];
