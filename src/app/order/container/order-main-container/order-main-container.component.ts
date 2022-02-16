import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as orderActions from '../../state/actions/order.actions';
import * as fromReducer from '../../state/reducers';
import { GetOrder } from '../../models/get-order';
import { Observable } from 'rxjs';
import { OrderListItem } from '../../models/order-list-item';
import { TableViewComponent } from 'src/app/shared/components/table-view/table-view.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchOrderCriteria } from '../../models/search-order-criteria';
import { Status } from '../../models/status';
import { Router } from '@angular/router';
import { AppConfirmService } from 'src/app/shared/components/app-confirm/app-confirm.service';
import { ConfirmData } from 'src/app/shared/models/confirm-data';

@Component({
  selector: 'app-order-main-container',
  templateUrl: './order-main-container.component.html',
  styleUrls: ['./order-main-container.component.scss']
})
export class OrderMainContainerComponent implements OnInit, AfterViewInit {

  orders$: Observable<OrderListItem[]> = this.store.select(fromReducer.getOrders);
  length$: Observable<number> = this.store.select(fromReducer.getTotalRecords);

  request: GetOrder;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  columns: object[] = [];
  detailColumns: object[] = [];

  searchForm: FormGroup;
  statusList: Status[] = this.getEstados();

  @ViewChild("orderDateCellTemplate", { static: false })
  private orderDateCellTemplate: TemplateRef<any>;

  @ViewChild("accionesCellTemplate", { static: false })
  private accionesCellTemplate: TemplateRef<any>;

  @ViewChild("orderIdCellTemplate", { static: false })
  private orderIdCellTemplate: TemplateRef<any>;

  @ViewChild("tableView", { static: false })
  private tableView: TableViewComponent;

  constructor(private store: Store<fromReducer.OrderState>,
    private fb: FormBuilder,
    private router: Router,
    private confirmService: AppConfirmService,
    private ref: ChangeDetectorRef) {
    this.buildSearchForm();
    this.refreshData();
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.columns = this.getColumns();
    this.detailColumns = this.getDetailColums();
    this.ref.detectChanges();
  }

  buildSearchForm(): void {
    this.searchForm = this.fb.group({
      dateFrom: ['', []],
      dateTo: ['', []],
      status: ['', []],
    });
  }

  search() {
    if (this.searchForm.valid) {
      if (this.searchForm.dirty) {
        let searchCriteria: SearchOrderCriteria;
        const newSearchCriteria = { ...searchCriteria, ...this.searchForm.value };
        this.store.dispatch(new orderActions.UpdateOrderSearchCriteria(newSearchCriteria));
        this.refreshData();
      }
    } else {
      console.log("no se actualizo nada.")
    }
  }

  getEstados(): Status[] {
    return [
      Status.CreateInstance(0, "New"),
      Status.CreateInstance(1, "Invoiced"),
      Status.CreateInstance(2, "Shipped"),
      Status.CreateInstance(3, "Closed")
    ];
  }

  refreshData(): void {
    this.request = new GetOrder(this.pageSizeOptions[0], 0);
    this.store.dispatch(new orderActions.LoadOrders(this.request));
  }

  getColumns(): object[] {
    return [
      {
        name: "Id",
        cellTemplate: this.orderIdCellTemplate,
        flexGrow: 1
      },
      {
        name: "Customer",
        prop: "customer",
        flexGrow: 1
      },
      {
        name: "Phone",
        prop: "phone",
        flexGrow: 1
      },
      {
        name: "Address",
        prop: "address",
        flexGrow: 1
      },
      {
        name: "City",
        prop: "city",
        flexGrow: 1
      },
      {
        name: "Fecha",
        cellTemplate: this.orderDateCellTemplate,
        flexGrow: 1
      },
      {
        name: "Status",
        prop: "statusName",
        flexGrow: 1
      },
      {
        name: "Acciones",
        cellTemplate: this.accionesCellTemplate,
        flexGrow: 1
      }
    ];
  }

  getDetailColums(): object[] {
    return [
      {
        name: "Product Name",
        prop: "product_name",
        flexGrow: 1
      },
      {
        name: "Quantity",
        prop: "quantity",
        flexGrow: 1
      },
      {
        name: "UnitPrice",
        prop: "unit_price",
        flexGrow: 0.5
      }
    ];
  }
  toggleExpandRow(row: any) {
    this.tableView.toogleExpandRow(row);
  }

  changePage(event: any): void {
    const offSet = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.request = new GetOrder(event.pageSize, offSet);
    this.store.dispatch(new orderActions.LoadOrders(this.request));
  }

  onViewDetail(orderId: number) {
    this.router.navigate(['order/detail/', orderId])
  }

  onRemoveOrder(orderId: number) {
    const confirmData = new ConfirmData('Delete Order', '¿Estas seguro de eliminar la orden?', true);
    this.confirmService.confirm(confirmData)
      .subscribe(result => {
        if (result) {
          this.store.dispatch(new orderActions.DeleteOrder(orderId));
        }
      })
  }
}
