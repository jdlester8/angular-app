import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from "d3";
import { interval } from 'rxjs';
import { Point } from '../../interfaces/interfaces';

@Component({
  selector: 'app-io-graph',
  standalone: true,
  imports: [],
  templateUrl: './io-graph.component.html',
  styleUrl: './io-graph.component.css'
})
export class IoGraphComponent implements AfterViewInit {

  @ViewChild("el") elem: ElementRef;

  ngAfterViewInit() {
    const width = 640;
    const height = 400;
    const marginTop = 50;
    const marginRight = 50;
    const marginBottom = 50;
    const marginLeft = 100;

    // Declare the x (horizontal position) scale.
    let xScale = d3.scaleLinear()
        .domain([0, 5])
        .range([marginLeft, width - marginRight]);


    // Declare the y (vertical position) scale.
    const yScale = d3.scaleLinear()
        .domain([-5, 5])
        .range([height - marginBottom, marginTop]);

    // Create the SVG container.
    const svg = d3.select(this.elem.nativeElement)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Add the x-axis.
    let xAxis = svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(xScale));
        
    // Add the y-axis.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(yScale));

    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", 375)
    .attr("y", 400)
    .text("X axis title");

    svg.append("text")
    .attr("text-anchor", "end")
    .attr("y", 50)
    .attr("x", -175)
    .attr("transform", "rotate(-90)")
    .text("Y axis title");

/*
    var vals = [];
    for (var i=0; i<xScale(10); i++) {
      vals.push({x: xScale(i/100), y: yScale(Math.sin(i/100)), col: "steelblue"});
      vals.push({x: xScale(i/100), y: yScale(Math.sin(3*i/100)/3), col: "blue"});
      vals.push({x: xScale(i/100), y: yScale(Math.sin(5*i/100)/5), col: "green"});
      vals.push({x: xScale(i/100), y: yScale(Math.sin(7*i/100)/7), col: "black"});
      vals.push({x: xScale(i/100), y: yScale(Math.sin(i/100) + Math.sin(3*i/100)/3 + Math.sin(5*i/100)/5 + Math.sin(7*i/100)/7), col: "red"});
    }

    svg
    .append("g")
    .selectAll("circle")
    .data(vals)
    .enter()
    .append("circle")
    .attr("cx", (d: any) => { return d.x; })
    .attr("cy", (d: any) => { return d.y; })
    .attr("r", 1)
    .attr("fill", (d: any) => { return d.col; });
*/

    //interval(2000).subscribe(() => {

        //d3.selectAll("circle").remove();

     svg
    .append("g")
    .selectAll("polyline")
    .append("polyline")
    .style("stroke", "black")  // colour the line
    .style("fill", "none")     // remove any fill colour
    .attr("points", '100, 50, 200, 150');
    //})

  }

}
