import * as employeeActions from '../actions/employee.actions';
import { Employee } from '../../models/employee';
import { BestEmployee } from '../../models/best-employee';

export interface State {
    employees: Employee[];
    totalRecords: number;
    employee: Employee;
    bestEmployee:BestEmployee;
}

const initialState: State = {
    employees: [],
    totalRecords: 0,
    employee: new Employee(),
    bestEmployee : new BestEmployee()
}

export function EmployeeReducer(state = initialState, action: employeeActions.Actions): State {
    switch (action.type) {
        case employeeActions.EmployeeActionTypes.LoadEmployees:
            {
                return state;
            }
        case employeeActions.EmployeeActionTypes.LoadEmployeesComplete:
            return {
                ...state,
                employees: action.payload.data,
                totalRecords: action.payload.totalRecords
            }
        case employeeActions.EmployeeActionTypes.LoadEmployeeById:
            return state;
        case employeeActions.EmployeeActionTypes.LoadEmployeeByIdComplete:
            return {
                ...state,
                employee: action.payload
            }
        case employeeActions.EmployeeActionTypes.AddEmployee: {
            return state;
        }
        case employeeActions.EmployeeActionTypes.AddEmployeeComplete: {
            return state;
        }

        case employeeActions.EmployeeActionTypes.DeleteEmployee: {
            return state;
        }
        case employeeActions.EmployeeActionTypes.DeleteEmployeeComplete: {
            return state;
        }
        case employeeActions.EmployeeActionTypes.LoadBestEmployee: {
            return state;
        }
        case employeeActions.EmployeeActionTypes.LoadBestEmployeeComplete: {
            return {
                ...state,
                bestEmployee: action.payload
            };
        }
        default:
            return state;
    }
}

export const getEmployees = (state: State) => state.employees;
export const getTotalRecords = (state: State) => state.totalRecords;
export const getEmployee = (state: State) => state.employee;
export const getBestEmployee = (state: State) => state.bestEmployee;