import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StepsListComponent } from './steps-list.component';
import { StepsService } from '../steps.service';
import { StepsListRoutes } from './steps-list.routing';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(StepsListRoutes)
  ],
  declarations: [StepsListComponent],
  providers: [StepsService]
})
export class StepsListModule { }
