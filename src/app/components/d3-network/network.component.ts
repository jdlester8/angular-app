import { Component, ElementRef, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { NetworkService } from '../../services/network/network.service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

// Define the data type for nodes
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

// Define the data type for links
class Link {
  node1: Node;
  node2: Node;

  constructor(node1: Node, node2: Node) {
    this.node1 = node1;
    this.node2 = node2;
  }
}

@Component({
  selector: 'app-network-graph',
  templateUrl: 'network.component.html',
  styleUrls: ['./network.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class NetworkComponent implements AfterViewInit {

  @ViewChild('context_menu') contextMenu!: TemplateRef<any>;
  mode: FormControl;

  constructor(private networkService: NetworkService) {
    this.mode = new FormControl("Move");
  }

  ngAfterViewInit(): void {
    this.drawLines();
    this.drawCircles();

    // Ensure initial mode is "Move" and apply drag behavior
    this.applyModeBehavior("Move");

    this.mode.valueChanges.subscribe((mode) => {
      this.applyModeBehavior(mode);
    });
  }

  applyModeBehavior(mode: string) {
    const svg = d3.select<SVGSVGElement, unknown>("#graph-container");
    const circles = svg.selectAll<SVGCircleElement, Node>('circle').data(this.networkService.nodes);

    if (mode === "Move") {
      circles.call(this.addDragBehavior());
    } else if (mode === "Link") {
      circles.on('.drag', null); // Remove the drag behavior when in "Link" mode
      circles.on('mousedown', null); // Remove any previous mousedown event handlers
      circles.each((d, i, nodes) => {
        this.createLinkBehavior(d3.select<SVGCircleElement, Node>(nodes[i]));
      });
    }
  }

  drawLines() {
    const svg = d3.select<SVGSVGElement, unknown>("#graph-container");
    const lines = svg.selectAll<SVGLineElement, Link>('line').data(this.networkService.links, (d: Link) => `${d.node1.id}-${d.node2.id}`);

    lines.enter()
      .append('line')
      .attr('x1', d => d.node1.x)
      .attr('y1', d => d.node1.y)
      .attr('x2', d => d.node2.x)
      .attr('y2', d => d.node2.y)
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

    lines.exit().remove();
  }

  drawCircles() {
    const svg = d3.select<SVGSVGElement, unknown>("#graph-container");
    const circles = svg.selectAll<SVGCircleElement, Node>('circle').data(this.networkService.nodes, (d: Node) => d.id);

    circles.enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 10)
      .attr('fill', 'steelblue');

    circles.exit().remove();
  }

  addDragBehavior() {
    const self = this;

    return d3.drag<SVGCircleElement, Node>()
      .on('start', function(event, d) {
        d3.select(this).raise().attr('stroke', 'black');
      })
      .on('drag', function(event, d) {
        d3.select(this)
          .attr('cx', d.x = event.x)
          .attr('cy', d.y = event.y);
        self.updateLines();
      })
      .on('end', function(event, d) {
        d3.select(this).attr('stroke', null);
      });
  }

  async createLinkBehavior(selection: d3.Selection<SVGCircleElement, Node, null, unknown>) {
    const svg = d3.select<SVGSVGElement, unknown>("#graph-container");

    selection.on('mousedown', async (startEvent) => {
      const startNode = d3.select<SVGCircleElement, Node>(startEvent.target as SVGCircleElement).datum();

      if (!startNode) {
        console.error("Start node is undefined");
        return;
      }

      const line = svg.append('line')
        .attr('x1', startNode.x)
        .attr('y1', startNode.y)
        .attr('stroke', 'black')
        .attr('stroke-width', 2);

      const mousemove = (moveEvent: MouseEvent) => {
        line.attr('x2', moveEvent.offsetX)
            .attr('y2', moveEvent.offsetY);
      };

      const mouseup = async (endEvent: MouseEvent) => {
        svg.on('mousemove', null);  // Unbind the mousemove event
        svg.on('mouseup', null);    // Unbind the mouseup event

        const endNode = d3.select<SVGCircleElement, Node>(endEvent.target as SVGCircleElement).datum();
        if (!endNode) {
          console.error("End node is undefined");
          line.remove();
          return;
        }

        this.networkService.links.push(new Link(startNode, endNode));
        this.updateLines();
        line.remove();  // Remove the temporary line
      };

      svg.on('mousemove', mousemove);
      svg.on('mouseup', mouseup);
    });
  }

  waitForEvent<E extends Event, T extends d3.BaseType>(selection: d3.Selection<T, unknown, HTMLElement, any>, eventType: string): Promise<E> {
    return new Promise(resolve => {
      selection.on(eventType, function(event) {
        selection.on(eventType, null); // Unbind the event
        resolve(event);
      });
    });
  }

  updateLines() {
    const lines = d3.selectAll<SVGLineElement, Link>('line');

    lines
      .attr('x1', d => d.node1.x)
      .attr('y1', d => d.node1.y)
      .attr('x2', d => d.node2.x)
      .attr('y2', d => d.node2.y);
  }
}
