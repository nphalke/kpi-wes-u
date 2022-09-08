import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HardwareService } from '../hardware.service';
import { HardwareEditComponent } from './hardware-edit.component';
import { HardwareEditRoutes } from './hardware-edit.routing';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    DragDropModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatSnackBarModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(HardwareEditRoutes)
  ],
  declarations: [HardwareEditComponent],
  providers: [HardwareService]
})
export class HardwareEditModule { }
