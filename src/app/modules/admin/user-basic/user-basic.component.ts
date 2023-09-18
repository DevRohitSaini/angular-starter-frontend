import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'stock',
  templateUrl: './user-basic.component.html',
  styleUrls: ['./user-basic.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserBasicComponent {
  constructor() {
  }
  
}
