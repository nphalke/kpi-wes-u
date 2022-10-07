import { Component, DoCheck, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import { interval, Subject, takeUntil } from "rxjs";
import { WorkflowService } from "src/app/workflow/workflow.service";
import { OrderService } from "../order.service";

@Component({
  selector: "wes-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.css"],
})
export class OrderListComponent implements DoCheck, OnInit, OnDestroy {
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      maxWidth: 50,
      checkboxSelection: true,
      //headerCheckboxSelection: true, // Enable select/unselect all feature
    },
    { field: "ID", resizable: true, headerName: "Order Number" },
    { field: "ItemName", resizable: true, headerName: "Item" },
    { field: "WorkflowName", resizable: true, headerName: "Workflow" },
    { field: "WorkflowStatus", resizable: true, headerName: "WF Status" },
    { field: "Elapsed", resizable: true, headerName: "Elapsed" },
    { field: "FlowName", resizable: true, headerName: "Flow" },
    { field: "CurrentFlowStep", resizable: true, headerName: "Flow Step" },
    { field: "StepElapsed", resizable: true, headerName: "Elapsed" },
    { field: "NextFlowStep", resizable: true, headerName: "Next Flow & Step" }
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
  public workflowType: string = "";
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private orderService: OrderService,
    private workflowService: WorkflowService
  ) {
  }

  ngOnInit() {
    this.getOrders();
    interval(3000)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.getOrders();
      });
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
      this.orders = response.data;
    });
  }

  refresh(): void {
    this.getOrders();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
