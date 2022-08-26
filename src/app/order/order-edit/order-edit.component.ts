import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { OrderService } from "../order.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "wes-order-edit",
  templateUrl: "./order-edit.component.html",
  styleUrls: ["./order-edit.component.css"],
})
export class OrderEditComponent {
  formGroup: FormGroup | undefined;
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  items: any[] = [];
  workFlow: any[] = [];
  order: any | undefined;
  isOrderExecuted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getItems();
    this.createForm();
    this.route.paramMap.subscribe((params: ParamMap) => {
      // View Mode
      if (params && params.get("id")) {
        const id: any = params.get("id");
        this.getOrder(id);
        this.isOrderExecuted = true;
        this.formGroup!.disable()
      }
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      ID: [{ value: '', disabled: true }],
      OrderDateTime: ['', Validators.required],
      CustomerName: ['', Validators.required],
      CustomerAddress: ['', Validators.required],
      ShippingDate: ['', Validators.required],
      ItemID: ['', Validators.required],
      Quantity: ['', Validators.required]
    });
  }

  get OrderDateTime() { return this.formGroup?.get('OrderDateTime'); }
  get CustomerName() { return this.formGroup?.get('CustomerName'); }
  get CustomerAddress() { return this.formGroup?.get('CustomerAddress'); }
  get ShippingDate() { return this.formGroup?.get('ShippingDate'); }
  get ItemID() { return this.formGroup?.get('ItemID'); }
  get Quantity() { return this.formGroup?.get('Quantity'); }


  save() {
    if (!this.formGroup?.valid) {
      return;
    }

    console.log('    this.formGroup', this.formGroup?.valid)
    console.log('    this.formGroup', this.formGroup)
    // let message: string = "";
    // if (this.flowName === "") {
    //   message = "Flow Name is not defined";
    // } else if (this.strategyName === "") {
    //   message = "Strategy Name is not defined";
    // } else if (this.flowSteps && this.flowSteps.length <= 0) {
    //   message = "Flow is not defined";
    // }
    // if (message !== "") {
    //   this._snackBar.open(message, "Error!", {
    //     horizontalPosition: this.horizontalPosition,
    //     verticalPosition: this.verticalPosition,
    //     duration: 3000,
    //   });
    // } else {
    //   //Save the flow
    //   this.flowSteps = this.flowSteps.map((step, index) => {
    //     return {
    //       stepId: step.id,
    //       stepOrder: index + 1,
    //     };
    //   });
    //   const flow = {
    //     name: this.flowName,
    //     strategyName: this.strategyName,
    //     flowSteps: [...this.flowSteps],
    //   };
    //   console.log("flow", flow);
    //   message = "Flow saved succefully!";
    //   this._snackBar.open(message, "", {
    //     horizontalPosition: this.horizontalPosition,
    //     verticalPosition: this.verticalPosition,
    //     duration: 3000,
    //   });
    //   this.router.navigate(["/flow-list"]);
    // }
  }

  back(): void {
    this.router.navigate(["/order-list"]);
  }

  getOrder(id: number): void {
    this.orderService.getOrder(id).subscribe((response: any) => {
      if (response && response.data) {
        this.order = response.data;
        this.formGroup?.get('ID')?.setValue(this.order.ID);
        this.formGroup?.get('OrderDateTime')?.setValue(this.order.OrderDateTime);
        this.formGroup?.get('CustomerName')?.setValue(this.order.CustomerName);
        this.formGroup?.get('CustomerAddress')?.setValue(this.order.CustomerAddress);
        this.formGroup?.get('ShippingDate')?.setValue(this.order.ShippingDate);
        this.formGroup?.get('ItemID')?.setValue(this.order.ItemID);
        this.formGroup?.get('Quantity')?.setValue(this.order.Quantity);
      }
    });
  }

  getItems(): void {
    this.orderService.getItems().subscribe((response: any) => {
      this.items = response.data;
    });
  }
}
