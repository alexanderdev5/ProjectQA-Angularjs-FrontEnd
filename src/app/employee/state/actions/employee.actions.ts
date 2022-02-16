import { Action } from '@ngrx/store';
import { GetEmployees } from '../../models/get-employees';
import { EmployeeList } from '../../models/employee-list';
import { Employee } from '../../models/employee';
import { BestEmployee } from '../../models/best-employee';

export enum EmployeeActionTypes {
    LoadEmployees = '[Employee] Load Employees',
    LoadEmployeesComplete = '[Employee] Load Employees Complete',
    LoadEmployeeById = '[Employee] Load Employee By Id',
    LoadEmployeeByIdComplete = '[Employee] Load Employee By Id Complete',
    AddEmployee = '[Employee] Add Employee',
    AddEmployeeComplete = '[Employee] Add Employee Complete',
    DeleteEmployee = '[Employee] Delete Employee',
    DeleteEmployeeComplete = '[Employee] Delete Employee Complete',
    LoadBestEmployee = '[Employee] Load Best Employee',
    LoadBestEmployeeComplete = '[Employee] Load Best Employee Complete'
}

export class LoadEmployees implements Action {
    readonly type = EmployeeActionTypes.LoadEmployees;
    constructor(public request: GetEmployees) { }
}

export class LoadEmployeesComplete implements Action {
    readonly type = EmployeeActionTypes.LoadEmployeesComplete;
    constructor(public payload: EmployeeList) { }
}

export class LoadEmployeeById implements Action {
    readonly type = EmployeeActionTypes.LoadEmployeeById;
    constructor(public employeeId: number) { }
}

export class LoadEmployeeByIdComplete implements Action {
    readonly type = EmployeeActionTypes.LoadEmployeeByIdComplete;
    constructor(public payload: Employee) { }
}

export class AddEmployee implements Action {
    readonly type = EmployeeActionTypes.AddEmployee;
    constructor(public employee: Employee) { }
}

export class AddEmployeeComplete implements Action {
    readonly type = EmployeeActionTypes.AddEmployeeComplete;
    constructor() { }
}


export class DeleteEmployee implements Action {
    readonly type = EmployeeActionTypes.DeleteEmployee;
    constructor(public employeeId: number) { }
}
export class DeleteEmployeeComplete implements Action {
    readonly type = EmployeeActionTypes.DeleteEmployeeComplete;
    constructor() { }
}

export class LoadBestEmployee implements Action {
    readonly type = EmployeeActionTypes.LoadBestEmployee;
    constructor() { }
}
export class LoadBestEmployeeComplete implements Action {
    readonly type = EmployeeActionTypes.LoadBestEmployeeComplete;
    constructor(public payload: BestEmployee) { }
}

export type Actions = LoadEmployees | LoadEmployeesComplete
    | LoadEmployeeById | LoadEmployeeByIdComplete
    | AddEmployee | AddEmployeeComplete
    | DeleteEmployee | DeleteEmployeeComplete
    | LoadBestEmployee | LoadBestEmployeeComplete;