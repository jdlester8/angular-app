import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { ClockService } from '../../services/clock/clock.service';

/*
class SignalGenerator implements AsyncIterable<Point> {
  [Symbol.asyncIterator](): AsyncIterator<Point> {
    let index = 0;
    return {
      next: () => {
        return new Promise<IteratorResult<Point>>(resolve => {
          setTimeout(() => {
            if (index < Infinity) {
              index += 0.1;
              resolve({ value: { x: index, y: Math.sin(index) }, done: false });
            } else {
              resolve({ value: undefined, done: true });
            }
          }, 10);
        });
      }
    };
  }
}

interface Point {
  x: number;
  y: number;
}
*/

@Component({
  selector: 'app-io-graph',
  templateUrl: './io-graph.component.html',
  styleUrls: ['./io-graph.component.css'],
  providers: [ClockService]
})
export class IoGraphComponent implements AfterViewInit {

  constructor() {

  }

  ngAfterViewInit() {
    const svg = d3.select('#io-graph')
    .attr('width', 1000)
    .attr('height', 480);

    console.log(svg);

    const marginBottom = 50;

    const x = d3.scaleLinear().domain([0, 10]).range([50, 950]);
    const y = d3.scaleLinear().domain([-1, 10]).range([468, 50]);

    const gx = svg.append("g")
    .attr("transform", `translate(0,430)`)
    .call(d3.axisBottom(x));

    const gy = svg.append("g")
    .attr("transform", `translate(50,0)`)
    .call(d3.axisLeft(y));

    setInterval(() => {
      const t = x.domain();
      x.domain([t[1], t[1]+10]);

      gx.transition()
      .duration(750)
      .call(d3.axisBottom(x));

      d3.selectAll("circle")
      .transition()
      .duration(750)
      .attr("cx", (d: any) => x(d.x))
      .attr("cy", (d: any) => y(d.y))
    }, 1250);

    /*
    const signal = new SignalGenerator();
    (async function() {
      let data: Point[] = [];
      for await (let point of signal) {
        data.push(point);
        svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d: any) => x(d.x))
        .attr("cy", (d: any) => y(d.y))
        .attr("r", 1);
        if (point.x > x.domain()[1]) {
          console.log("drawing off screen");
        }
      }
    })();
    */
  }
}