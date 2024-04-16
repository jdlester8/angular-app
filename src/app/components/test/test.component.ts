import { Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { NetworkService } from '../../services/network.service';

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
interface CircleSelection extends d3.Selection<SVGCircleElement, Node, SVGGElement, unknown> {}

// Create a selection interface for lines
interface LineSelection extends d3.Selection<SVGLineElement, Link, SVGGElement, unknown> {}


@Component({
  selector: 'app-network-graph',
  template: `
    <svg id="graph-container" width="1000" height="600"></svg>
  `,
  styleUrls: ['./network-graph.component.css'],
  standalone: true
})
export class NetworkGraphComponent {

  constructor(private networkService: NetworkService) { 
  }

  ngAfterViewInit(): void {

    //factory pattern? angular service?
    const node1 = new Node("1", 50, 50);
    const node2 = new Node("2", 100, 100);
    const node3 = new Node("3", 150, 75);
    const node4 = new Node("4", 200, 125);

    const link1 = new Link(node1, node2);
    const link2 = new Link(node2, node3);
    const link3 = new Link(node3, node4);

    createGraph([
      node1, node2, node3, node4
    ],
    [
      link1, link2, link3
    ]);
  }
}

function createGraph(nodes: Node[], links: Link[]) {
  const svg = d3.select<SVGSVGElement, Node>("#graph-container");

  // Create a group for circles and lines
  const group = svg.append('g');

  // Update data join for circles
  const circles: CircleSelection = group.selectAll<SVGCircleElement, Node>('circle').data(nodes);

  // Enter selection for circles
  circles
    .enter()
    .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', 10)
    .attr('fill', 'steelblue')
    .call(dragCircle); // Call drag behavior for circles

  // Update data join for lines
  const lines: LineSelection = group.selectAll<SVGLineElement, Link>('line').data(links);

  // Enter selection for lines
  lines
    .enter()
    .append('line')
    .attr('x1', d => d.node1.x)
    .attr('y1', d => d.node1.y)
    .attr('x2', d => d.node2.x)
    .attr('y2', d => d.node2.y)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    //.call(this.dragLine); // Call drag behavior for lines
}

// Define drag behavior for circles
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