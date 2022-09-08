import { Component, DoCheck, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import { HardwareService } from "../hardware.service";

@Component({
  selector: "wes-hardware-list",
  templateUrl: "./hardware-list.component.html",
  styleUrls: ["./hardware-list.component.css"],
})
export class HardwareListComponent implements DoCheck, OnInit {
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      maxWidth: 50,
      checkboxSelection: true,
      //headerCheckboxSelection: true, // Enable select/unselect all feature
    },
    { field: "ID", resizable: true, width: 10 },
    { field: "Name", resizable: true },
    { field: "Type", resizable: true },
    { field: "Model", resizable: true }
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
    private hardwareService: HardwareService
  ) {
  }

  ngOnInit() {
    this.getHardwares();
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
    this.router.navigate(["/hardware-edit"]);
  }

  view(): void {
    const selectedRows = this.agGrid.api.getSelectedRows();
    this.router.navigate(['/hardware-edit', selectedRows[0].ID]);
  }

  getHardwares(): void {
    this.hardwareService.getHardwares().subscribe((response: any) => {
      this.flows = response.data;
    });
  }
}
