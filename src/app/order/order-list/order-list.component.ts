import { HttpClient } from "@angular/common/http";
import { Component, DoCheck, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import { OrderService } from "../order.service";

@Component({
  selector: "wes-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.css"],
})
export class OrderListComponent implements DoCheck, OnInit {
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      maxWidth: 50,
      checkboxSelection: true,
      //headerCheckboxSelection: true, // Enable select/unselect all feature
    },
    { field: "ID", resizable: true },
    { field: "OrderDateTime", resizable: true, headerName: "Order Date" },
    { field: "CustomerName", resizable: true },
    { field: "ShippingDate", resizable: true }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public orders: any[] = [];

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  public isDisabled: boolean = true;

  constructor(
    private router: Router,
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.getOrders();
  }

  ngDoCheck() {
    if (this.agGrid) {

      if (this.agGrid.api.getSelectedRows().length === 1) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.agGrid.api.sizeColumnsToFit();
  }

  add(): void {
    this.router.navigate(["/order-edit"]);
  }

  view(): void {
    const selectedRows = this.agGrid.api.getSelectedRows();
    this.router.navigate(['/order-edit', selectedRows[0].ID]);
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe((response: any) => {
      console.log('response', response)
      this.orders = response.data;
    });
  }
}
