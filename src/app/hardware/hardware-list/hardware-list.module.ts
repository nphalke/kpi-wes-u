import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HardwareListComponent } from './hardware-list.component';
import { HardwareService } from '../hardware.service';
import { HardwareListRoutes } from './hardware-list.routing';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(HardwareListRoutes)
  ],
  declarations: [HardwareListComponent],
  providers: [HardwareService]
})
export class HardwareListModule { }
