import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClockService } from '../../services/clock/clock.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-time-graph',
  standalone: true,
  templateUrl: './time-graph.component.html',
  styleUrls: ['./time-graph.component.css'],
  providers: [ClockService]
})
export class TimeGraphComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private clockService: ClockService) {}

  ngOnInit() {
    this.subscription = this.clockService.clock$.subscribe((tick: number) => {
      console.log(tick);
    });
  }

  ngAfterViewInit() {
    const svg = d3.select('#time-graph')
    .attr('width', 1000)
    .attr('height', 480);

    const marginBottom = 50;

    const x = d3.scaleLinear().domain([0, 10]).range([50, 950]);
    const y = d3.scaleLinear().domain([-1, 10]).range([468, 50]);

    const gx = svg.append("g")
    .attr("transform", `translate(0,430)`)
    .call(d3.axisBottom(x));

    const gy = svg.append("g")
    .attr("transform", `translate(50,0)`)
    .call(d3.axisLeft(y));

    this.clockService.clock$.subscribe((time) => {
      time = Math.round(time) / 1000;
      x.domain([time, time+10]);

      gx.transition()
      .duration(1000)
      .call(d3.axisBottom(x));
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
