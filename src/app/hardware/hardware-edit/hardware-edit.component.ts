import { Component } from "@angular/core";
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
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HardwareService } from "../hardware.service";

@Component({
  selector: "wes-hardware-edit",
  templateUrl: "./hardware-edit.component.html",
  styleUrls: ["./hardware-edit.component.css"],
})
export class HardwareEditComponent {
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
    private hardwareService: HardwareService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createForm();
    this.isSaveDisabled = false;
    this.route.paramMap.subscribe((params: ParamMap) => {
      // View Mode
      if (params && params.get("id")) {
        const id: any = params.get("id");
        this.getHardware(id);
        this.isSaveDisabled = true;
        this.formGroup!.disable();
      }
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      ID: [{ value: '', disabled: true }],
      Name: ['', Validators.required],
      Type: [''],
      Model: [''],
      WeightCapacity: ['']
    });
  }

  get Name() { return this.formGroup?.get('Name'); }

  save() {
    if (!this.formGroup?.valid) {
      return;
    }

    console.log('this.formGroup.value', this.formGroup.value)

    this.hardwareService.saveHardware(this.formGroup.value).subscribe((res) => {
      this.router.navigate(["/hardware-list"]);
      this._snackBar.open('Hardware saved successfully!', "", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
      });
    });
  }

  back(): void {
    this.router.navigate(["/hardware-list"]);
  }

  getHardware(id: number): void {
    this.hardwareService.getHardware(id).subscribe((response: any) => {
      console.log('getHardware', response.data)
      if (response) {
        this.formGroup?.get('Name')?.setValue(response.data.Name);
        this.formGroup?.get('Type')?.setValue(response.data.Type);
        this.formGroup?.get('Model')?.setValue(response.data.Model);
        this.formGroup?.get('WeightCapacity')?.setValue(response.data.WeightCapacity)
      }
    });
  }
}
