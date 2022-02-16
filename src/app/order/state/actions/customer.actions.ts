import { Action } from '@ngrx/store';
import { GetCustomers } from '../../models/gest-customers';
import { CustomerList } from '../../models/customer-list';

export enum CustomerActionTypes {
    LoadCustomers = '[Order-Customer] Load Customers',
    LoadCustomersComplete = '[Order-Customer] Load Customers Complete'
}

export class LoadCustomers implements Action {
    readonly type = CustomerActionTypes.LoadCustomers;
    constructor(public request: GetCustomers) { }
}

export class LoadCustomersComplete implements Action {
    readonly type = CustomerActionTypes.LoadCustomersComplete;
    constructor(public payload: CustomerList) { }
}

export type Actions = LoadCustomers | LoadCustomersComplete;