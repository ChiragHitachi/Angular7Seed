import {
  OnInit,
  Component,
  ViewChild,
  Input,
  OnChanges,
  HostListener,
  ChangeDetectorRef
} from '@angular/core';
import {
  Chart
} from 'chart.js';

@Component({
  selector: 'eag-line-chart',
  templateUrl: './line-chart.component.html'

})

export class LineChartComponent implements OnChanges {
  @ViewChild('lineChart') private chartRef;
  chart: any;

  @Input()
  public dataPoints: any;
  @Input()
  public labels: any;
  constructor(private cdr: ChangeDetectorRef) {

  }
  ngOnChanges() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.prepareChart();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.chart) {
      this.chart.resize();
      this.chart.render(true);
      this.cdr.detectChanges();
    }
  }

  public prepareChart() {
    if (this.dataPoints.length > 0) {
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'line',
        data: {
          labels: this.labels, // your labels array
          datasets: this.dataPoints
        },
        options: {
          legend: {
            display: true
          }

        }
      });
    }
  }


}
