import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import { FlexLayoutModule } from '@angular/flex-layout';
import { FlowEditComponent } from './flow-edit.component';
import { FlowEditRoutes } from './flow-edit.routing';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { FlowService } from '../flow.service';

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
    RouterModule.forChild(FlowEditRoutes)
  ],
  declarations: [FlowEditComponent],
  providers: [FlowService]
})
export class FlowEditModule { }
