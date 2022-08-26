import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list.component';
import { OrderListRoutes } from './order-list.routing';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { OrderService } from '../order.service';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(OrderListRoutes)
  ],
  declarations: [OrderListComponent],
  providers: [OrderService]
})
export class OrderListModule { }
