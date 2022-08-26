import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import { FlexLayoutModule } from '@angular/flex-layout';
import { WorkflowEditRoutes } from './workflow-edit.routing';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { WorkflowEditComponent } from './workflow-edit.component';
import { MatSelectModule } from '@angular/material/select';
import { WorkflowService } from '../workflow.service';

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
    MatSelectModule,
    FormsModule,
    RouterModule.forChild(WorkflowEditRoutes)
  ],
  declarations: [WorkflowEditComponent],
  providers: [WorkflowService]
})
export class WorkflowEditModule { }
