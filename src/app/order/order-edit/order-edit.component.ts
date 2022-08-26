import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { OrderService } from "../order.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as _moment from 'moment';

@Component({
  selector: "wes-order-edit",
  templateUrl: "./order-edit.component.html",
  styleUrls: ["./order-edit.component.css"],
})
export class OrderEditComponent {
  formGroup: FormGroup | undefined;
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  inventories: any[] = [];
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
    this.getInventory();
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
      OrderType: ['', Validators.required],
      CustomerName: ['', Validators.required],
      CustomerAddress: ['', Validators.required],
      ShippingDate: ['', Validators.required],
      InventoryID: ['', Validators.required],
      Quantity: ['', Validators.required]
    });
  }

  get OrderDateTime() { return this.formGroup?.get('OrderDateTime'); }
  get OrderType() { return this.formGroup?.get('OrderType'); }
  get CustomerName() { return this.formGroup?.get('CustomerName'); }
  get CustomerAddress() { return this.formGroup?.get('CustomerAddress'); }
  get ShippingDate() { return this.formGroup?.get('ShippingDate'); }
  get InventoryID() { return this.formGroup?.get('InventoryID'); }
  get Quantity() { return this.formGroup?.get('Quantity'); }


  save() {
    if (!this.formGroup?.valid) {
      return;
    }

    const orderDateTime = new Date(this.formGroup.value.OrderDateTime);
    const shippingDate = new Date(this.formGroup.value.ShippingDate);
    const postData: any = this.formGroup.value;

    postData.OrderDateTime = _moment(orderDateTime).format("YYYY/MM/DD HH:MM::SS")
    postData.ShippingDate = _moment(shippingDate).format("YYYY/MM/DD HH:MM::SS")

    this.orderService.saveOrder(this.formGroup.value).subscribe((res) => {
      this.router.navigate(["/order-list"]);
      this._snackBar.open('Order saved successfully!', "", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
      });
    });
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
        this.formGroup?.get('OrderType')?.setValue(this.order.OrderType);
        this.formGroup?.get('CustomerName')?.setValue(this.order.CustomerName);
        this.formGroup?.get('CustomerAddress')?.setValue(this.order.CustomerAddress);
        this.formGroup?.get('ShippingDate')?.setValue(this.order.ShippingDate);
        this.formGroup?.get('InventoryID')?.setValue(this.order.InventoryID);
        this.formGroup?.get('Quantity')?.setValue(this.order.Quantity);
      }
    });
  }

  getInventory(): void {
    this.orderService.getInventory().subscribe((response: any) => {
      this.inventories = response.data;
    });
  }
}
