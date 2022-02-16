import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductBestSeller } from '../../models/best-seller';
import * as Highcharts from "highcharts";

@Component({
  selector: 'app-best-seller-product-chart',
  templateUrl: './best-seller-product-chart.component.html',
  styleUrls: ['./best-seller-product-chart.component.scss']
})
export class BestSellerProductChartComponent implements OnInit, OnChanges {


  @Input()
  products: ProductBestSeller[];
  Highcharts: any;
  chartOptions: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.products && changes.products.currentValue) {
      this.buildChart();
    }
  }

  ngOnInit() {
  }

  buildChart(): void {
    this.Highcharts = Highcharts;
    this.chartOptions = {
      title: {
        text: '10 Productos que generan mas ingresos'
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: '% del Total de Ingresos'
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> del total<br/>'
      },
      series: [
        {
          name: 'Products',
          data: this.products,
          type: 'column',
          colorByPoint: true
        }
      ]
    }
  }

}
