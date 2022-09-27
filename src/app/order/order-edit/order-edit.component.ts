import { Component, OnDestroy, AfterViewInit, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { OrderService } from "../order.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as _moment from 'moment';
import { WorkflowService } from "src/app/workflow/workflow.service";
import { interval, Subject, takeUntil } from "rxjs";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTree, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: "wes-order-edit",
  templateUrl: "./order-edit.component.html",
  styleUrls: ["./order-edit.component.css"],
})
export class OrderEditComponent implements AfterViewInit, OnInit, OnDestroy {
  formGroup: FormGroup | undefined;
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  inventories: any[] = [];
  workFlow: any;
  order: any | undefined;
  isOrderExecuted: boolean = false;
  workFlowName: string = '';

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  TREE_DATA: any[] = [
    {
      name: 'Fruit',
      children: [
        { name: 'Apple' },
        { name: 'Banana' },
        {
          name: 'Fruit loops',
          children: [
            { name: 'Apple2' },
            { name: 'Banana2' },
            {
              name: 'Fruit loops2',
              children: [
                { name: 'Apple3' },
                { name: 'Banana3' },
                {
                  name: 'Fruit loops3',
                  children: [
                    { name: 'Apple4' },
                    { name: 'Banana4' },
                    {
                      name: 'Fruit loops4',
                      children: [
                        { name: 'Apple5' },
                        { name: 'Banana5' },
                        {
                          name: 'Fruit loops5',
                          children: [
                            { name: 'Apple6' },
                            { name: 'Banana6' },
                            { name: 'ORDEROO01 ITEMO00002 HML Workflow Processing 0:02:32 AMR HSLP Transport Step 1 - Heavy Lifting Arm AMR AS Transport - Step 1  HML Workflow Processing 0:02:32 AMR HSLP Transport Step 1 - Heavy Lifting Arm AMR AS Transport - Step 1' },

                          ],
                        },

                      ],
                    },

                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
        },
        {
          name: 'Orange',
          children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
        },
      ],
    }, {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
        },
        {
          name: 'Orange',
          children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
        },
      ],
    },
    {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
        },
        {
          name: 'Orange',
          children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
        },
      ],
    },
    {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
        },
        {
          name: 'Orange',
          children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
        },
      ],
    },
    {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
        },
        {
          name: 'Orange',
          children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
        },
      ],
    },
    {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
        },
        {
          name: 'Orange',
          children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
        },
      ],
    },
    {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
        },
        {
          name: 'Orange',
          children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
        },
      ],
    },
  ];


  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private workflowService: WorkflowService
  ) { }

  ngOnInit() {
    // this.dataSource.data = this.TREE_DATA;
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

    // interval(2000)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(x => {
    //     console.log('.......')
    //     for (let i = 0; i < this.workFlow.Workflow_Flows.length; i++) {
    //       if (this.workFlow.Workflow_Flows[i].flowSteps) {
    //         const index = this.workFlow.Workflow_Flows[i].flowSteps.findIndex((x: any) => x.step_status === 'In-Progress');
    //         console.log('index', index)
    //         if (index !== -1) {
    //           this.workFlow.Workflow_Flows[i].flowSteps[index].step_status = "Completed";
    //           if (this.workFlow.Workflow_Flows.length === i + 1) {
    //             // this.unsubscribe$.next(true);
    //             // this.unsubscribe$.unsubscribe();
    //             break;
    //           }

    //           if (this.workFlow.Workflow_Flows[i].flowSteps.length >= index + 1) {
    //             if (this.workFlow.Workflow_Flows[i].flowSteps[index + 1]) {
    //               this.workFlow.Workflow_Flows[i].flowSteps[index + 1].step_status = "In-Progress";
    //             } else {
    //               if (this.workFlow.Workflow_Flows[i + 1] && this.workFlow.Workflow_Flows[i + 1].flowSteps) {
    //                 this.workFlow.Workflow_Flows[i + 1].flowSteps[0].step_status = "In-Progress";
    //               }
    //             }
    //           }
    //           break;
    //         }

    //       }

    //     }
    //   });
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngAfterViewInit() {
    // this.treeControl.expandAll();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      ID: [{ value: '', disabled: true }],
      OrderDateTime: ['', Validators.required],
      OrderType: ['', Validators.required],
      // CustomerName: ['', Validators.required],
      // CustomerAddress: ['', Validators.required],
      ///ShippingDate: ['', Validators.required],
      InventoryID: ['', Validators.required],
      Quantity: ['', Validators.required]
    });
  }

  get OrderDateTime() { return this.formGroup?.get('OrderDateTime'); }
  get OrderType() { return this.formGroup?.get('OrderType'); }
  // get CustomerName() { return this.formGroup?.get('CustomerName'); }
  // get CustomerAddress() { return this.formGroup?.get('CustomerAddress'); }
  //get ShippingDate() { return this.formGroup?.get('ShippingDate'); }
  get InventoryID() { return this.formGroup?.get('InventoryID'); }
  get Quantity() { return this.formGroup?.get('Quantity'); }


  save() {
    if (!this.formGroup?.valid) {
      return;
    }

    const orderDateTime = new Date(this.formGroup.value.OrderDateTime);
    //const shippingDate = new Date(this.formGroup.value.ShippingDate);
    const postData: any = this.formGroup.value;

    postData.OrderDateTime = _moment(orderDateTime).format("YYYY/MM/DD HH:MM::SS")
    //postData.ShippingDate = _moment(shippingDate).format("YYYY/MM/DD HH:MM::SS")

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
        // this.formGroup?.get('CustomerName')?.setValue(this.order.CustomerName);
        // this.formGroup?.get('CustomerAddress')?.setValue(this.order.CustomerAddress);
        //this.formGroup?.get('ShippingDate')?.setValue(this.order.ShippingDate);
        this.formGroup?.get('InventoryID')?.setValue(this.order.InventoryID);
        this.formGroup?.get('Quantity')?.setValue(this.order.Quantity);

        //this.workFlowName = this.order.Name;
        if (this.order.WorkflowID) {
          // this.getWorkflow(this.order.WorkflowID);
          this.getOrderDetails(this.order.ID);
          this.getLogs(this.order.ID);
        }
      }
    });
  }

  getInventory(): void {
    this.orderService.getInventory().subscribe((response: any) => {
      this.inventories = response.data;
    });
  }

  // getWorkflow(id: number): void {
  //   this.workflowService.getWorkflow(id).subscribe((response: any) => {
  //     this.workFlow = [];
  //     if (response) {
  //       this.workFlowName = response.data.Name;
  //       //this.storageLocation = response.data.ID;
  //       response.data.WorkflowFlows.forEach((item: any) => {
  //         // get flow steps for each flow
  //         if (item.FlowID) {
  //           this.workflowService.getFlow(item.FlowID)
  //             .subscribe((flowResponse: any) => {
  //               this.workFlow.push(flowResponse.data)
  //             });
  //         }
  //       });
  //     }
  //   });
  // }

  getOrderDetails(id: number): void {
    this.workflowService.getOrderDetails(id).subscribe((response: any) => {
      //this.workFlow = [];
      if (response) {
        this.workFlow = response.data;
        console.log('this.workFlowName', this.workFlow)
        this.workFlowName = this.workFlow.Name;

        // for (let i = 0; i < this.workFlow.Workflow_Flows.length; i++) {
        //   if (this.workFlow.Workflow_Flows[i].flowSteps) {
        //     for (let j = 0; j < this.workFlow.Workflow_Flows[i].flowSteps.length; j++) {
        //       if (this.workFlow.Workflow_Flows[i].flowSteps[j].step_status === "In-Progress") {

        //         setTimeout(() => {
        //           this.workFlow.Workflow_Flows[i].flowSteps[j].step_status = "Completed";
        //           this.workFlow.Workflow_Flows[i].flowSteps[j + 1].step_status = "In-Progress";
        //         }, 2000);

        //       }
        //     }

        //   }
        // }
      }
    });
  }

  getLogs(id: number): void {
    this.orderService.getLogs(id).subscribe((response: any) => {
      console.log('getLogs', [response.data])
      this.dataSource.data = [response.data];
      this.treeControl.expandAll();
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
