import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import { FlexLayoutModule } from '@angular/flex-layout';
import { OrderEditComponent } from './order-edit.component';
import { OrderEditRoutes } from './order-edit.routing';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../order.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

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
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(OrderEditRoutes)
  ],
  declarations: [OrderEditComponent],
  providers: [OrderService]
})
export class OrderEditModule { }
