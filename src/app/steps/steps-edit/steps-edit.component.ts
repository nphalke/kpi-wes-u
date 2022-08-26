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
import { StepsService } from "../steps.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "wes-steps-edit",
  templateUrl: "./steps-edit.component.html",
  styleUrls: ["./steps-edit.component.css"],
})
export class StepsEditComponent {
  formGroup: FormGroup | undefined;
  name: string = "";
  type: string = "";
  hardwareId: number = 0;
  setting1: string = "";
  setting2: string = "";
  hardwares: any[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  public isSaveDisabled: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private stepsService: StepsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createForm();
    this.isSaveDisabled = false;
    this.route.paramMap.subscribe((params: ParamMap) => {
      // View Mode
      if (params && params.get("id")) {
        const id: any = params.get("id");
        this.getStep(id);
        this.isSaveDisabled = true;
        this.formGroup!.disable();
      }
    });
  }

  createForm() {
    this.getHardwares();
    this.formGroup = this.formBuilder.group({
      ID: [{ value: '', disabled: true }],
      Name: ['', Validators.required],
      Type: ['', Validators.required],
      HardwareID: [''],
      Setting1: [''],
      Setting2: ['']
    });
  }

  get Name() { return this.formGroup?.get('Name'); }
  get Type() { return this.formGroup?.get('Type'); }

  save() {
    if (!this.formGroup?.valid) {
      return;
    }

    this.stepsService.saveStep(this.formGroup.value).subscribe((res) => {
      this.router.navigate(["/steps-list"]);
      this._snackBar.open('Step saved successfully!', "", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
      });
    });
  }

  back(): void {
    this.router.navigate(["/steps-list"]);
  }

  getHardwares(): void {
    this.stepsService.getHardwares().subscribe((response: any) => {
      if (response) {
        this.hardwares = response.data
      }
    });
  }

  getStep(id: number): void {
    this.stepsService.getStep(id).subscribe((response: any) => {
      if (response) {
        this.formGroup?.get('Name')?.setValue(response.data.Name);
        this.formGroup?.get('Type')?.setValue(response.data.Type);
        this.formGroup?.get('HardwareID')?.setValue(response.data.HardwareID);
        this.formGroup?.get('Setting1')?.setValue(response.data.Setting1);
        this.formGroup?.get('Setting2')?.setValue(response.data.Setting2);
      }
    });
  }
}
