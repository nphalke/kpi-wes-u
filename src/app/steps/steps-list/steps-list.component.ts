import { Component, DoCheck, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import { StepsService } from "../steps.service";

@Component({
  selector: "wes-steps-list",
  templateUrl: "./steps-list.component.html",
  styleUrls: ["./steps-list.component.css"],
})
export class StepsListComponent implements DoCheck, OnInit {
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      maxWidth: 50,
      checkboxSelection: true,
      //headerCheckboxSelection: true, // Enable select/unselect all feature
    },
    { field: "ID", resizable: true },
    { field: "Name", resizable: true },
    { field: "Type", resizable: true }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public flows: any[] = [];

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  public isDisabled: boolean = true;

  constructor(
    private router: Router,
    private stepsService: StepsService
  ) {
  }

  ngOnInit() {
    this.getSteps();
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
    this.router.navigate(["/flow-edit"]);
  }

  view(): void {
    const selectedRows = this.agGrid.api.getSelectedRows();
    this.router.navigate(['/flow-edit', selectedRows[0].ID]);
  }

  getSteps(): void {
    this.stepsService.getSteps().subscribe((response: any) => {
      this.flows = response.data;
    });
  }
}
