import { Component } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import {
  ActivatedRoute,
  ParamMap,
  Router,
} from "@angular/router";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { FlowService } from "../flow.service";

@Component({
  selector: "wes-flow-edit",
  templateUrl: "./flow-edit.component.html",
  styleUrls: ["./flow-edit.component.css"],
})
export class FlowEditComponent {
  steps: any[] = [];
  flowName: string = "";
  strategyName: string = "";
  flowType: string = "";
  flowSteps: any[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  public isSaveDisabled: boolean = false;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private flowService: FlowService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getSteps();
    this.isSaveDisabled = false;
    this.route.paramMap.subscribe((params: ParamMap) => {
      // View Mode
      if (params && params.get("id")) {
        const id: any = params.get("id");
        this.getFlow(id);
        this.getFlowSteps(id);
        this.isSaveDisabled = true;
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    const dataToMove: string = this.steps[event.previousIndex];

    if (
      event.previousContainer === event.container &&
      event.container.id !== "cdk-steps"
    ) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (
      event.previousContainer !== event.container &&
      event.container.id !== "cdk-steps"
    ) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.steps.splice(event.previousIndex, 0, dataToMove);
    }
  }

  removeFromWorkFlow(item: string, index: number): void {
    this.flowSteps.splice(index, 1);
  }

  save() {
    let message: string = "";
    if (this.flowName === "") {
      message = "Flow Name is not defined";
    } else if (this.strategyName === "") {
      message = "Strategy Name is not defined";
    } else if (this.flowSteps && this.flowSteps.length <= 0) {
      message = "Flow is not defined";
    }

    if (message !== "") {
      this._snackBar.open(message, "Error!", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
      });
    } else {
      //Save the flow
      this.flowSteps = this.flowSteps.map((step, index) => {
        return {
          stepId: step.ID,
          stepOrder: index + 1,
        };
      });
      const flow = {
        name: this.flowName,
        strategyName: this.strategyName,
        flowType: this.flowType,
        flowSteps: [...this.flowSteps],
      };

      this.flowService.saveFlow(flow).subscribe((res) => {
        message = "Flow saved succefully!";
        this._snackBar.open(message, "", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });

        this.router.navigate(["/flow-list"]);

      });
    }
  }

  back(): void {
    this.router.navigate(["/flow-list"]);
  }

  getSteps(): void {
    this.flowService.getSteps().subscribe((response: any) => {
      this.steps = response.data;
    });
  }

  getFlowSteps(id: number): void {
    this.flowService.getFlowSteps(id).subscribe((response: any) => {
      if (response) {
        this.flowSteps = response.data.map((item: any) => {
          return {
            ID: item.ID,
            Name: item.StepName,
            Setting1: item.Setting1,
            Setting2: item.Setting2,
            HardwareModel: item.HardwareModel
          };
        });
      }
    });
  }

  getFlow(id: number): void {
    this.flowService.getFlow(id).subscribe((response: any) => {
      if (response) {
        this.flowName = response.data.Name;
        this.strategyName = response.data.StrategyName;
        this.flowType = response.data.FlowType;
      }
    });
  }
}
