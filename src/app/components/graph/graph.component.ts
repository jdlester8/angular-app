import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, LineController, registerables} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { sqrt } from 'mathjs';

@Component({
  selector: 'graph',
  standalone: true,
  imports: [],
  templateUrl: 'graph.component.html',
})
export class GraphComponent implements AfterViewInit {
  constructor() {
  }

  ngAfterViewInit() {
    Chart.register(...registerables);
    new Chart(document.getElementById("sineWaveChart") as HTMLCanvasElement,
    {
      type: "scatter",
      data: {
        datasets: [{
          label: "My Data",
          data: calculateCirclePoints(5, 0, 0, 100)
        }]
      },
      options: {
        scales: {
          x: {
            type: "linear"
          },
          y: {
            type: "linear"
          }
        }
      }
    })
  }
}

function calculateCirclePoints(radius: number, centerX: number, centerY: number, 
  numberOfPoints: number) {
  const points = [];
  const angleIncrement = (2 * Math.PI) / numberOfPoints;

  for (let i = 0; i < numberOfPoints; i++) {
      const angle = i * angleIncrement;
      const x = radius * Math.cos(angle) + centerX;
      const y = radius * Math.sin(angle) + centerY;
      points.push({ x: x, y: y });
  }

  return points;
}

/*
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, LineController, registerables} from 'chart.js';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'graph',
  standalone: true,
  imports: [],
  templateUrl: 'graph.component.html',
})
export class GraphComponent extends LineController {

  @ViewChild("chart") ctx: ElementRef<HTMLCanvasElement>;

  constructor() {
    super();
  }

}
    let chart =     new Chart(this.ctx.nativeElement, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'test',
            data: [
              {
                x: Date.now(),
                y: 0
              }
            ]
          }
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
          }
        }
      }
    });
    super(chart);
    Chart.register(...registerables);
  }

  ngAfterViewInit() {


    this.chart.draw
    window.requestAnimationFrame(this.update);
    console.log(this.chart);
  }

  update() {
    console.log(this.chart);
    if (this.chart.data.datasets[0].data.length > 100) {
      this.chart.data.datasets[0].data.shift();
    }
    this.chart.data.datasets[0].data.push({
      x: Date.now(),
      y: Math.sin(Date.now())
    });
    this.chart.update('none');

    window.requestAnimationFrame(this.update);
  }
}
*/