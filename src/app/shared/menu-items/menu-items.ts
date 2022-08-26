import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'steps-list', type: 'link', name: 'Steps', icon: 'web' },
  { state: 'flow-list', type: 'link', name: 'Flows', icon: 'web' },
  { state: 'workflow-list', type: 'link', name: 'Workflows', icon: 'web' },
  { state: 'order-list', type: 'link', name: 'Orders', icon: 'view_list' }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
