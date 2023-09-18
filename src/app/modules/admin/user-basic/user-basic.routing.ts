import { Route } from '@angular/router';
import { UserBasicListComponent } from './list/user-basic-list';
import { UserBasicDetailsComponent } from './details/user-basic-details';
import { UserBasicComponent } from './user-basic.component';

export const UserBasicRoute: Route[] = [
  {
    path: '',
    component: UserBasicComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: UserBasicListComponent
      },
      {
        path: 'create',
        component: UserBasicDetailsComponent        
      },
      {
        path: 'edit/:id',
        component: UserBasicDetailsComponent
      }
    ]
  },
];
