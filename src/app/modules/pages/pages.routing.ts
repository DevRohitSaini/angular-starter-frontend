
import { Route } from '@angular/router';
import { Page1 } from './landing-page/page1';

export const PagesRouting: Route[] = [
  {
      path     : '',
      pathMatch: 'full',
      component: Page1,

  },

];
