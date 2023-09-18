import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserBasicService } from 'src/app/core/services/user-basic.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() toggle:boolean=true;
  sidebar: boolean = this._userBasicService.sidebar;

  constructor(
    private _userBasicService: UserBasicService,
    private _router: Router,

  ) { }

  ngOnInit(): void {
  }

  goNavigate(url: string) {
    this._router.navigate([url]);
  }
  
}
