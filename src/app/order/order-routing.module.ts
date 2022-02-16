import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderMainContainerComponent } from './container/order-main-container/order-main-container.component';
import { OrderManageContainerComponent } from './container/order-manage-container/order-manage-container.component';


const routes: Routes = [
  {
    path :'',
    component: OrderMainContainerComponent
  },
  {
    path :'manage',
    component: OrderManageContainerComponent
  },
  {
    path:'detail/:id',
    component: OrderManageContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
