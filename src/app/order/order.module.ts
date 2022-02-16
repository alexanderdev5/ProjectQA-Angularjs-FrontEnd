import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderMainContainerComponent } from './container/order-main-container/order-main-container.component';
import { SharedModule } from '../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state/reducers';
import { OrderEffects } from './state/effects/order.effects';
import { OrderManageContainerComponent } from './container/order-manage-container/order-manage-container.component';
import { CustomerPopupContainerComponent } from './container/customer-popup-container/customer-popup-container.component';
import { CustomerEffects } from './state/effects/customer.effects';
import { CustomerPopupComponent } from './components/customer-popup/customer-popup.component';
import { ProductEffects } from './state/effects/product.effects';
import { ProductPopupContainerComponent } from './container/product-popup-container/product-popup-container.component';
import { ProductPopupComponent } from './components/product-popup/product-popup.component';
import { OrderDetailTableComponent } from './components/order-detail-table/order-detail-table.component';
@NgModule({
  declarations: [OrderMainContainerComponent, OrderManageContainerComponent, CustomerPopupContainerComponent, CustomerPopupComponent, ProductPopupContainerComponent, ProductPopupComponent, OrderDetailTableComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    StoreModule.forFeature('order', reducers),
    EffectsModule.forFeature([OrderEffects,CustomerEffects,ProductEffects])
  ],
  entryComponents:[CustomerPopupContainerComponent, ProductPopupContainerComponent]
})
export class OrderModule { }
