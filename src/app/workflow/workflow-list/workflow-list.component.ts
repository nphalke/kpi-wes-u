import { Component, DoCheck, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import { WorkflowService } from "../workflow.service";

@Component({
  selector: "wes-workflow-list",
  templateUrl: "./workflow-list.component.html",
  styleUrls: ["./workflow-list.component.css"],
})
export class WorkflowListComponent implements DoCheck, OnInit {
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      maxWidth: 50,
      checkboxSelection: true,
      //headerCheckboxSelection: true, // Enable select/unselect all feature
    },
    { field: "ID", resizable: true },
    { field: "Name", resizable: true, headerName: "Title" },
    { field: "StorageLocationName", resizable: true, headerName: "Storage Location" }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  // public workflows$!: Observable<any[]>;
  public workflows: any[] = [];

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public isDisabled: boolean = true;

  constructor(private workflowService: WorkflowService, private router: Router) { }

  ngOnInit() {
    this.getWorkflows();
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

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    // this.workflows$ = this.http.get<any[]>(
    //   "https://www.ag-grid.com/example-assets/row-data.json"
    // );

    // this.workflows = [
    //   {
    //     ID: 1,
    //     Name: "Heavy Single Line Work Flow",
    //     StorageLocationName: "sssssssssssss"
    //   },
    //   {
    //     ID: 2,
    //     Name: "Heavy Multi Line Work Flow",
    //     StorageLocationName: ""
    //   },
    //   {
    //     ID: 3,
    //     Name: "Transport Only Flow",
    //     StorageLocationName: ""
    //   }
    // ];

    this.agGrid.api.sizeColumnsToFit();
  }

  add(): void {
    this.router.navigate(["/workflow-edit"]);
  }

  view(): void {
    const selectedRows = this.agGrid.api.getSelectedRows();
    this.router.navigate(['/workflow-edit', selectedRows[0].ID]);
  }

  getWorkflows(): void {
    this.workflowService.getWorkflows().subscribe((response: any) => {
      if (response && response.data) {
        this.workflows = response.data;
      }
    });
  }
}
