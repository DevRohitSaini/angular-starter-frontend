import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { UserBasic, UsersBasicData } from "src/app/core/models/user-basic.model";
import { UserBasicService } from "src/app/core/services/user-basic.service";
import { ToastService } from "src/app/shared/toast.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";


@Component({
  selector: 'user-list',
  templateUrl: './user-basic-list.html',
})
export class UserBasicListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  userBasic: UserBasic[] | any;

  /**
  * here columns of table are declared
  */
  userBasicListTableColumns: any[] = [
    "userID",
    "name",
    "mobile",
    "email",
    "location",
    "isBlocked",
    "action",
  ];
  page = {'page' : 1, 'limit': 10, 'totalElements': 0, 'totalPages': 0, 'filter': '', 'role': '', 'sort': -1,
    'key': 'createdAt', 'type': '', 'isDeleted': 'false'};

  data: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private _userBasicService: UserBasicService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _toasterService: ToastService
  ) { }

  ngOnInit(): void {
    this.fetchAll();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.data.paginator = this._paginator;
      this.data.sort = this._sort;
      this.data.sortingDataAccessor = (item, property) => {
        switch (property) {
          default: return item[property];
        }
      }
    }, 500);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void { }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * @fetchall this function is used to fetch all data
  */
  fetchAll() {
    this._userBasicService.fetchAll(this.page).subscribe((response: UsersBasicData) => {
      // Get the users
      this.userBasic = response.data || [];

      // Assign it to data of table
      this.data.data = this.userBasic;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  };

  /**
   * Search filter for user
   * @param event
  */
  searchUser(event: any) {
    this.page.filter = event.target.value;
    this.fetchAll();
  }

  /**
   * @deleteFn function is used for delete data
  */
  deleteFn(id: string): void {
    if (confirm("Are you sure to delete ?")) {
      this._userBasicService.delete(id).subscribe(response => {
        this._toasterService.showToast('Deleted Successfully', '', 'success');
        this.fetchAll();
      });
    }
  };

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
  */
  trackByFn(index: number, item: any): any {
    return item._id || index;
  }

}

