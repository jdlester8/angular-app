import { Component, ElementRef, ViewChild, TemplateRef, ViewContainerRef, createComponent, EnvironmentInjector, ComponentFactoryResolver,  } from '@angular/core';
import * as d3 from 'd3';
import { NetworkService } from '../../services/network/network.service';
import { CdkContextMenuTrigger, CdkMenuItem, CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectorRef } from '@angular/core';
import { ContextmenuComponent } from '../contextmenu/contextmenu.component';
// Define the data type for your selection
class Node {
  id: string;
  x: number;
  y: number;

  constructor(id: string, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
}

class Link {
  node1: Node;
  node2: Node;

  constructor(node1: Node, node2: Node) {
    this.node1 = node1;
    this.node2 = node2;
  }
}

// Create a selection interface for circles
//interface CircleSelection extends d3.Selection<SVGCircleElement, Node, SVGGElement, unknown> {}

// Create a selection interface for lines
//interface LineSelection extends d3.Selection<SVGLineElement, Link, SVGGElement, unknown> {}


@Component({
  selector: 'app-network-graph',
  templateUrl: 'network.component.html',
  styleUrls: ['./network.component.css'],
  standalone: true,
  imports: [ContextmenuComponent, CdkContextMenuTrigger, CdkMenuItem, CdkMenu, CdkMenuTrigger]
})
export class NetworkComponent {
  
  @ViewChild('context_menu') contextMenu!: TemplateRef<any>;

  constructor(private networkService: NetworkService) { 
  }
  ngAfterViewInit(): void {
    this.drawLines();
    this.drawCircles();
    //this.processLinkMode();
    this.processMoveMode();
  }

  drawLines() {
    const svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> = d3.select("#graph-container");
    const lines = svg.selectAll<SVGLineElement, Link>('line').data(this.networkService.links);
    lines
      .enter()
      .append('line')
      .attr('x1', d => d.node1.x)
      .attr('y1', d => d.node1.y)
      .attr('x2', d => d.node2.x)
      .attr('y2', d => d.node2.y)
      .attr('stroke', 'black')
      .attr('stroke-width', 2);
  }

  drawCircles() {
    const svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> = d3.select("#graph-container");
    const circles = svg.selectAll<SVGCircleElement, Node>('circle').data(this.networkService.nodes);
    circles
      .enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 10)
      .attr('fill', 'steelblue');
      //.call(dragCircle)
  }

  createLine(selection: d3.Selection<SVGCircleElement, Node, SVGSVGElement, unknown>) {
    return new Promise(function(resolve) {
      selection
      .on("mousedown", function(event) {
        console.log(event);
        selection.on("mousedown", null);
        resolve(event);
      });
    });
  }

  dragAndDropLine(selection: d3.Selection<SVGCircleElement, Node, SVGSVGElement, unknown>) {
    const svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> = d3.select("#graph-container");
    return new Promise(function(resolve) {
      svg
      .on("mousemove", function(event) {
        console.log(event);
      })
      .on("mouseup", function(event) {
        console.log(event);
        svg.on("mousemove", null);
        svg.on("mouseup", null);
        resolve(event);
      });
    });
  }

  processLinkMode() {
    const svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> = d3.select("#graph-container");
    const circles = svg.selectAll<SVGCircleElement, Node>('circle').data(this.networkService.nodes);
    const loop = async (selection: d3.Selection<SVGCircleElement, Node, SVGSVGElement, unknown>) => {
      await this.createLine(selection);
      await this.dragAndDropLine(selection);
      loop(selection);
    }
    circles.call(loop);
  }

  processMoveMode() {
    const svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> = d3.select("#graph-container");
    const circles = svg.selectAll<SVGCircleElement, Node>('circle').data(this.networkService.nodes);
    const dragCircle = d3.drag<SVGCircleElement, Node>()
    .on('start', function (event, d) {
      d3.select(this).raise().attr('stroke', 'black');
    })
    .on('drag', function (event, d) {
      d3.select(this)
        .attr('cx', d.x = event.x)
        .attr('cy', d.y = event.y);

      //update lines
      const lines = d3.selectAll<SVGLineElement, Link>('line');

      lines
      .attr('x1', d => d.node1.x)
      .attr('y1', d => d.node1.y)

      lines
      .attr('x2', d => d.node2.x)
      .attr('y2', d => d.node2.y);
    })
    .on('end', function (event, d) {
      d3.select(this).attr('stroke', null);
    });
    circles.call(dragCircle);
  }
}