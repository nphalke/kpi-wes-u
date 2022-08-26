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
import { StepsService } from '../steps.service';
import { StepsEditRoutes } from './steps-edit.routing';
import { StepsEditComponent } from './steps-edit.component';
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
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(StepsEditRoutes)
  ],
  declarations: [StepsEditComponent],
  providers: [StepsService]
})
export class StepsEditModule { }
