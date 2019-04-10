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
  selector: 'eag-polar-chart',
  templateUrl: './polar-area.component.html'

})

export class PolarAreaChartComponent implements OnChanges {
  @ViewChild('polarChart') private chartRef;
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
        type: 'polarArea',
        data: {
          labels: this.labels, // your labels array
          datasets: this.dataPoints
        },
        options: {
          legend: {
            display: true
          },
          animation: {
            duration: 500,
            easing: "easeOutQuart",
            onComplete: function () {
              var ctx = this.chart.ctx;
              ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';

              this.data.datasets.forEach(function (dataset) {

                for (var i = 0; i < dataset.data.length; i++) {
                  var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                    total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                    mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
                    start_angle = model.startAngle,
                    end_angle = model.endAngle,
                    mid_angle = start_angle + (end_angle - start_angle) / 2;

                  var x = mid_radius * Math.cos(mid_angle);
                  var y = mid_radius * Math.sin(mid_angle);

                  ctx.fillStyle = '#fff';
                  if (i == 3) { // Darker text color for lighter background
                    ctx.fillStyle = '#444';
                  }
                  var percent = String(Math.round(dataset.data[i] / total * 100)) + "%";
                  //Don't Display If Legend is hide or value is 0
                  if (dataset.data[i] !== 0 && (dataset._meta[0] === undefined || dataset._meta[0].data[i].hidden != true)) {
                    ctx.fillText(dataset.data[i], model.x + x, model.y + y);
                    // Display percent in another line, line break doesn't work for fillText
                    //ctx.fillText(percent, model.x + x, model.y + y + 15);
                  }
                }
              });
            }
          }
        }
      });
    }
  }


}
