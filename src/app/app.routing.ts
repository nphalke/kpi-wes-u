import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'flow-list',
        loadChildren: () => import('./flow/flow-list/flow-list.module').then(m => m.FlowListModule)
      },
      {
        path: 'flow-edit',
        loadChildren: () => import('./flow/flow-edit/flow-edit.module').then(m => m.FlowEditModule)
      },
      {
        path: 'flow-edit/:id',
        loadChildren: () => import('./flow/flow-edit/flow-edit.module').then(m => m.FlowEditModule)
      },
      {
        path: 'workflow-list',
        loadChildren: () => import('./workflow/workflow-list/workflow-list.module').then(m => m.WorkflowListModule)
      },
      {
        path: 'workflow-edit',
        loadChildren: () => import('./workflow/workflow-edit/workflow-edit.module').then(m => m.WorkflowEditModule)
      },
      {
        path: 'workflow-edit/:id',
        loadChildren: () => import('./workflow/workflow-edit/workflow-edit.module').then(m => m.WorkflowEditModule)
      },
      {
        path: 'order-list',
        loadChildren: () => import('./order/order-list/order-list.module').then(m => m.OrderListModule)
      },
      {
        path: 'order-edit',
        loadChildren: () => import('./order/order-edit/order-edit.module').then(m => m.OrderEditModule)
      },
      {
        path: 'order-edit/:id',
        loadChildren: () => import('./order/order-edit/order-edit.module').then(m => m.OrderEditModule)
      }
    ]
  }
];
