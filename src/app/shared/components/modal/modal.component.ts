import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserBasic } from 'src/app/core/models/user-basic.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() deleteUser: EventEmitter<any> = new EventEmitter();
  @Input() editUser: EventEmitter<any> = new EventEmitter();
  @Input() role: string = '';
  @Input() selectedUser: UserBasic;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  delete() {
    this.deleteUser.emit();
  }

  edit() {
    this.editUser.emit();
  }

}
