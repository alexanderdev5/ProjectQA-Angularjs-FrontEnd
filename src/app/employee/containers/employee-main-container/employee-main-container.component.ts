import { Component, OnInit } from '@angular/core';
import * as employeeActions from '../../state/actions/employee.actions';
import * as fromReducer from '../../state/reducers';
import { Store, ActionsSubject } from '@ngrx/store';
import { GetEmployees } from '../../models/get-employees';
import { Employee } from '../../models/employee';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { EmployeeDetailContainerComponent } from '../employee-detail-container/employee-detail-container.component';
import { EmployeeNewContainerComponent } from '../employee-new-container/employee-new-container.component';
import { AppConfirmService } from 'src/app/shared/components/app-confirm/app-confirm.service';
import { ConfirmData } from 'src/app/shared/models/confirm-data';
import { ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { BestEmployee } from '../../models/best-employee';

@Component({
  selector: 'app-employee-main-container',
  templateUrl: './employee-main-container.component.html',
  styleUrls: ['./employee-main-container.component.scss']
})
export class EmployeeMainContainerComponent implements OnInit {

  request: GetEmployees;
  private ngUnsubscribe: Subject<any> = new Subject<any>();
  constructor(private store: Store<fromReducer.EmployeeState>,
    private dialog: MatDialog,
    private confirm: AppConfirmService,
    private actionSubject$: ActionsSubject) {
    this.triggers();
  }

  employees$: Observable<Employee[]> = this.store.select(fromReducer.getEmployees);
  bestEmployee$ : Observable<BestEmployee> = this.store.select(fromReducer.getBestEmployee);
  length$: Observable<number> = this.store.select(fromReducer.getTotalRecords);
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  ngOnInit() {
    this.refreshdata();
  }

  triggers(): void {
    this.actionSubject$
      .pipe(takeUntil(this.ngUnsubscribe))
      .pipe(ofType(employeeActions.EmployeeActionTypes.DeleteEmployeeComplete))
      .subscribe(_ => {
        this.refreshdata();
      })
  }

  refreshdata(): void {
    this.request = new GetEmployees(this.pageSizeOptions[0], 0);
    this.store.dispatch(new employeeActions.LoadEmployees(this.request))
    this.store.dispatch(new employeeActions.LoadBestEmployee());
  }

  changePage(event: any): void {
    const offSet = event.pageIndex * event.pageSize;
    this.request = new GetEmployees(event.pageSize, offSet);
    this.store.dispatch(new employeeActions.LoadEmployees(this.request));
  }

  viewDetails(event: any): void {
    const dialogRef = this.dialog.open(EmployeeDetailContainerComponent,
      {
        panelClass: 'employee-modal-dialog',
        data: { employeeId: event.id }
      }
    );

    dialogRef.afterClosed().subscribe(_ => this.refreshdata());
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(EmployeeNewContainerComponent,
      {
        panelClass: 'employee-modal-dialog'
      }
    );

    dialogRef.afterClosed().subscribe(_ => this.refreshdata());
  }

  onDelete(event: any): void {
    const confirmData = new ConfirmData('Delete Employee', '¿Estas seguro de eliminar el empleado?', true);
    this.confirm.confirm(confirmData)
      .subscribe(result => {
        if (result) {
          this.store.dispatch(new employeeActions.DeleteEmployee(event.id));
        }
      })
  }
}
