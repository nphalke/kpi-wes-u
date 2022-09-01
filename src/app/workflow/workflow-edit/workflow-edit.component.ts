import { Component } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { WorkflowService } from "../workflow.service";

@Component({
  selector: "wes-workflow-edit",
  templateUrl: "./workflow-edit.component.html",
  styleUrls: ["./workflow-edit.component.css"],
})
export class WorkflowEditComponent {
  flows: any[] = [];
  // flows: any[] = [
  //   {
  //     id: 1,
  //     flowName: "Carton Erector Build",
  //     flowSteps: [
  //       {
  //         id: 1,
  //         stepName: 'Hardware Type - Carton Erector - EAGLE T20CF'
  //       },
  //       {
  //         id: 2,
  //         stepName: 'Hardware Type - Portal - Windows 11'
  //       },
  //       {
  //         id: 3,
  //         stepName: 'Hardware Type - Scanner - Zebra DS4308-XD (IDENTIFER)'
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     flowName: "Transport to Picking",
  //     flowSteps: [
  //       {
  //         id: 4,
  //         stepName: 'Transport - AMR - RARUK MiR1000 (IDENTIFIER)'
  //       }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     flowName: "Heavy Single Line Picking",
  //     flowSteps: [
  //       {
  //         id: 5,
  //         stepName: 'Hardware Type - Heavy Lifting Arm - Swisslog ItemPiQ'
  //       }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     flowName: "Transport to Packing",
  //     flowSteps: [
  //       {
  //         id: 6, stepName: 'Hardware Type - AMR - RARUK MiR1000 (IDENTIFIER)'
  //       }
  //     ]
  //   },
  //   {
  //     id: 5,
  //     flowName: "PANDA",
  //     flowSteps: [
  //       {
  //         id: 7,
  //         stepName: 'Hardware Type - Conveyco - Product Name (IDENTIFIER)'
  //       },
  //       {
  //         id: 8,
  //         stepName: 'Hardware Type - Potal - Windows 11'
  //       },
  //       {
  //         id: 9,
  //         stepName: 'Hardware Type - Scanner - Zebra DS4308-XD (IDENTIFIER)'
  //       }
  //     ]
  //   },
  //   {
  //     id: 6,
  //     flowName: "Transport to Ship Sorter",
  //     flowSteps: [
  //       {
  //         id: 10,
  //         stepName: 'Hardware Type - Conveyor - Product Name (IDENTIFIER)'
  //       }
  //     ]
  //   }
  // ];

  workFlowName: string = '';
  workFlow: any[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  storageLocations: any[] = [];
  //   { id: '1', name: 'Test', buildingNo: "23424", blockNo: "4234" },
  //   { id: '2', name: 'Loc. No. II', buildingNo: "A-2", blockNo: "B-1B" },
  //   { id: '3', name: 'Loc. No. III', buildingNo: "A-3", blockNo: "B-1C" }
  // ];
  public storageLocation: string = '';
  public isSaveDisabled: boolean = false;

  constructor(
    private workflowService: WorkflowService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getStorageLocations();
    this.getFlows();
    this.isSaveDisabled = false;
    this.route.paramMap.subscribe((params: ParamMap) => {
      // View Mode
      if (params && params.get("id")) {
        const id: any = params.get("id");
        this.getWorkflows(id);
        this.isSaveDisabled = true;
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    const dataToMove: string = this.flows[event.previousIndex];

    if (
      event.previousContainer === event.container &&
      event.container.id !== "cdk-steps"
    ) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.flows.splice(event.previousIndex, 0, dataToMove);
    }
  }

  removeFromWorkFlow(item: string, index: number): void {
    this.workFlow.splice(index, 1);
  }

  save(): void {
    let message: string = '';
    if (this.workFlowName === '') {
      message = 'Workflow Title is not defined';
    }
    // else if (this.storageLocation === '') {
    //   message = 'Storage Location not selected';
    // } 
    else if (this.workFlow && this.workFlow.length <= 0) {
      message = 'Workflow is not defined';
    }

    if (message !== '') {
      this._snackBar.open(message, "Error!", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000
      });
    } else {
      //Save the flow
      const workFlowSteps = this.workFlow.map((flow, index) => {
        return {
          flowID: flow.ID,
          flowOrder: index + 1,
        };
      });
      const workFlow = {
        name: this.workFlowName,
        storageLocationID: this.storageLocation,
        workflowFlows: [...workFlowSteps],
      };

      this.workflowService.saveWorkflow(workFlow).subscribe((res) => {
        message = 'Workflow saved succefully!';
        this._snackBar.open(message, "", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000
        });

        this.router.navigate(["/workflow-list"]);
      });
    }
  }

  back(): void {
    this.router.navigate(["/workflow-list"]);
  }

  getStorageLocations() {
    this.workflowService.getStorageLocations().subscribe((response: any) => {
      if (response && response.data) {
        this.storageLocations = response.data;
      }
    });
  }

  getFlows(): void {
    this.workflowService.getFlows()
      .subscribe((response: any) => {
        if (response && response.data) {
          response.data.forEach((flow: any) => {
            // get flow steps for each flow
            this.workflowService.getFlow(flow.ID)
              .subscribe((flowResponse: any) => {
                this.flows.push(flowResponse.data)
              });
          });
        }
      });
  }


  getWorkflows(id: number): void {
    this.workflowService.getWorkflow(id).subscribe((response: any) => {
      this.workFlow = [];
      if (response) {
        this.workFlowName = response.data.Name;
        //this.storageLocation = response.data.ID;
        response.data.WorkflowFlows.forEach((item: any) => {
          // get flow steps for each flow
          if (item.FlowID) {
            this.workflowService.getFlow(item.FlowID)
              .subscribe((flowResponse: any) => {
                this.workFlow.push(flowResponse.data)
              });
          }
        });
      }
    });
  }
}
