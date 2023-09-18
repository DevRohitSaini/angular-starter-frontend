import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() data: MatTableDataSource<any> = new MatTableDataSource();
  @Input() fields: any[] = [];
  @Input() userBasicListTableColumns: any[] = [];
  @Input() userBasic: any[] = [];
  @Output() sendData: EventEmitter<any> = new EventEmitter();
  @Output() receipt: EventEmitter<any> = new EventEmitter();
  @Output() deleteUser: EventEmitter<any> = new EventEmitter();
  @Output() fetch: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator) private _paginator: MatPaginator | any;
  @ViewChild(MatSort) private _sort: MatSort | any;
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.data.paginator = this._paginator;
    this.data.sort = this._sort
    this._changeDetectorRef.markForCheck();
    
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.data.paginator = this._paginator;
      this.data.sort = this._sort
      this.data.sortingDataAccessor = (item, property) => {
        switch (property) {
          default: return item[property];
        }
      }
    }, 500);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  };

  /**
   * Track by function for ngFor loops
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item._id || index;
  }

  /**
   * @delete function is used for delete a user
   */
  delete(id: any) {
    this.deleteUser.emit(id);
    this._changeDetectorRef.markForCheck();

  };

  /**
   * @genaratepdf for a user details
   */
  generateReceipt(id: string) {
    this.receipt.emit(id);
    this._changeDetectorRef.markForCheck();

  };

  /**
   *
   * @email send function used for sending sms
   */
  sendCredentialsMail(id: string) {
    this.sendData.emit(id)
    this._changeDetectorRef.markForCheck();
  };

}

