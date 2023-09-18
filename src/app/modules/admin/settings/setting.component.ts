import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'stock',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingComponent {
  constructor() {
  }

}
