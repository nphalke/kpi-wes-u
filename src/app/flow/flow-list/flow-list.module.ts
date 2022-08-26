import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FLowListComponent } from './flow-list.component';
import { FlowListRoutes } from './flow-list.routing';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { FlowService } from '../flow.service';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(FlowListRoutes)
  ],
  declarations: [FLowListComponent],
  providers: [FlowService]
})
export class FlowListModule { }
