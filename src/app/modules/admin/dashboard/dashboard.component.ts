import { Component, OnInit } from '@angular/core';
import { UserBasic } from 'src/app/core/models/user-basic.model';
import { UserBasicService, UsersBasicData } from 'src/app/core/services/user-basic.service';
import { ToastService } from "src/app/shared/toast.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: { admin: any, role: string };
  totalUsers: number = 0;
  arr: UserBasic[] = [];

  constructor(
    private _userBasicService: UserBasicService
  ) { }

  ngOnInit(): void {
    this.currentUser = this._userBasicService.getUserData();
    this.fetchAll();
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

   /**
   * @fetchall this function is used to fetch all user
   */

   fetchAll():any {
    this._userBasicService.fetchAll({}).subscribe((response: UsersBasicData) => {     
      this.arr = response.data || []; 
      this.totalUsers = this.arr.length;     
    });
  };

}
