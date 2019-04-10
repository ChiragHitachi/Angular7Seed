import {
  OnInit,
  Component,
  ViewChild,
  Input,
  OnChanges,
  HostListener
} from '@angular/core';
import {
  Chart,
  ChartDataSets
} from 'chart.js';


@Component({
  selector: 'eag-stack-bar',
  templateUrl: './stack-bar.component.html'

})

export class StackBarChartComponent implements OnChanges {
  @ViewChild('requirementChart') private chartRef;
  chart: any;
  @Input()
  public dataPoints: ChartDataSets[];
  @Input()
  public labels: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.chart) {
      this.chart.resize();
      this.chart.render(true);
    }
  }
  ngOnChanges() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.prepareChart();
  }

  public prepareChart() {
    if (this.dataPoints.length > 0) {

      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'bar',
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
              ctx.textBaseline = 'top';

              this.data.datasets.forEach(function (dataset) {
                for (var i = 0; i < dataset.data.length; i++) {
                  var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                    scale_max = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
                  ctx.fillStyle = '#fff';
                  var y_pos = model.y;
                  // Make sure data value does not get overflown and hidden
                  // when the bar's value is too close to max value of scale
                  // Note: The y value is reverse, it counts from top down
                  if ((scale_max - model.y) / scale_max >= 0.93)
                    y_pos = model.y + 20;
                  ctx.fillText(dataset.data[i], model.x, y_pos);
                }
              });
            }
          },
          scales: {
            xAxes: [{
              stacked: true
            }
            ],
            yAxes: [{
              stacked: true
            }],
          }
        }
      });

    }

  }


}
