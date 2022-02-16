import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  @Input()
  employees: Employee[] = [];

  @Output()
  viewDetails: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  delete: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onViewDetails(event: any): void {
    this.viewDetails.emit(event)
  }

  onEdit(event: any): void {

  }

  onDelete(event: any): void {
    this.delete.emit(event);
  }
}
