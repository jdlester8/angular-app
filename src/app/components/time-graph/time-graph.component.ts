import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ClockService } from '../../services/clock/clock.service';
import * as d3 from 'd3';
import { SignalGeneratorService } from '../../services/signal-generator/signal-generator.service';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-time-graph',
  standalone: true,
  templateUrl: './time-graph.component.html',
  styleUrls: ['./time-graph.component.css'],
  providers: [
    ClockService
  ],
  imports: [ReactiveFormsModule, MatSliderModule]
})
export class TimeGraphComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscription: Subscription;
  intervalControl: FormControl;
  xControl: FormControl;
  yControl: FormControl;
  private data: Array<{ time: number; value: number }>;
  private time: number;
  private proportionFactor: number;
  signals: Array<{ amplitude: number; phase: number; frequency: number; }>;

  constructor(private clockService: ClockService, private signalGeneratorService: SignalGeneratorService) {
    this.intervalControl = new FormControl(10000);
    this.xControl = new FormControl(10);
    this.yControl = new FormControl(10);
    this.data = [];
    this.signals = [];
    this.time = new Date().getTime();
    this.proportionFactor = this.intervalControl.value / this.xControl.value;
  }

  ngOnInit() {
    this.subscription = new Subscription();

    this.subscription.add(
      this.xControl.valueChanges.pipe(
        debounceTime(300)
      ).subscribe(value => {
        if (value > 0) {
          this.proportionFactor = this.xControl.value / 10;
          this.intervalControl.setValue(this.proportionFactor * 10000);
        }
      })
    );

    this.subscription.add(
      this.intervalControl.valueChanges.pipe(
        debounceTime(300)
      ).subscribe(value => {
        if (value > 0) {
          this.clockService.updateInterval(value);
        }
      })
    );
  }

  ngAfterViewInit() {
    const svg = d3.select('#time-graph')
      .attr('width', 1000)
      .attr('height', 480);

    const marginBottom = 50;

    const x = d3.scaleLinear().domain([0, this.xControl.value]).range([50, 950]);
    const y = d3.scaleLinear().domain([-1, this.yControl.value]).range([468, 50]);

    const gx = svg.append("g")
      .attr("transform", `translate(0,430)`)
      .call(d3.axisBottom(x));

    const gy = svg.append("g")
      .attr("transform", `translate(50,0)`)
      .call(d3.axisLeft(y));

    this.subscription.add(this.clockService.clock$.subscribe((time) => {
      this.time = time;
      time = Math.round(time) / 1000;
      x.domain([time, time + this.xControl.value]);

      gx.transition()
        .duration(100)
        .call(d3.axisBottom(x) as any);
    }));

    this.subscription.add(this.signalGeneratorService.signal$.subscribe((signal) => {
      this.data.push(signal);

      // Filter out old data outside the x time domain
      const [start, end] = x.domain();
      this.data = this.data.filter(d => d.time / 1000 >= start && d.time / 1000 <= end);

      // Update the circles on the graph
      const circles = svg.selectAll<SVGCircleElement, { time: number; value: number }>("circle")
        .data(this.data, d => d.time as any); // Use `d.time` as the key

      circles.enter()
        .append("circle")
        .attr("cx", (d: any) => x(Math.round(d.time) / 1000))
        .attr("cy", (d: any) => y(d.value))
        .attr("r", 1)
        .merge(circles as any)
        .attr("cx", (d: any) => x(Math.round(d.time) / 1000))
        .attr("cy", (d: any) => y(d.value));

      circles.exit().remove(); // Remove old circles
    }));

    this.subscription.add(
      this.xControl.valueChanges.pipe(
        debounceTime(300)
      ).subscribe(value => {
        if (value > 0) {
          x.domain([x.domain()[0], x.domain()[0] + value]);
          
          gx.transition()
            .duration(100)
            .call(d3.axisBottom(x) as any);
        }
      })
    );

    this.subscription.add(
      this.yControl.valueChanges.pipe(
        debounceTime(300)
      ).subscribe(value => {
        if (value > 0) {
          y.domain([y.domain()[0], y.domain()[0] + value]);
          
          gy.transition()
            .duration(100)
            .call(d3.axisLeft(y) as any);

          const yOrigin = y(0);
          gx.attr("transform", `translate(0,${yOrigin})`);
        }
      })
    );
  }

  createSignal() {
    const signal = {
      amplitude: 1,
      phase: 0,
      frequency: 1
    };
    this.signals.push(signal);
    const subject = this.signalGeneratorService.createSignal();
    subject.subscribe((x) => {
      console.log(x);
    });
  }

  connectAudio() {

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
