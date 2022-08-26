import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkflowListComponent } from './workflow-list.component';
import { WorkflowListRoutes } from './workflow-list.routing';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WorkflowService } from '../workflow.service';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(WorkflowListRoutes)
  ],
  declarations: [WorkflowListComponent],
  providers: [WorkflowService]
})
export class WorkflowListModule { }
