import { Component, ViewChild } from "@angular/core";
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from "ng-apexcharts";

export interface VisitorChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
  stroke: any;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
}

@Component({
  selector: "app-our-visiter",
  templateUrl: "./our-visiter.component.html"
})
export class OurVisiterComponent {
  @ViewChild("visitor-chart") chart2: ChartComponent = Object.create(null);
  public VisitorChartOptions: Partial<VisitorChartOptions>;

  constructor() {
    this.VisitorChartOptions = {
      series: [5, 15, 2],
      chart: {
        type: "donut",
        fontFamily: "Poppins,sans-serif",
        height: 253,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "80px",
          },
        },
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      labels: ["Active", "Completed", "Inactive"],
      colors: ["#0000FF", "#00FF00", "#ff0000"],
      responsive: [
        {
          breakpoint: 767,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
    };
  }

  ngOnInit(): void { }
}
