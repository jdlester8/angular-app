import { Component, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { GraphService, MyNode } from '../../services/networkv3/networkv3.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-network',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent {
  selectedNode: MyNode | null = null;
  isModalVisible: boolean = false;

  constructor(private graphService: GraphService, private el: ElementRef) {}

  ngOnInit(): void {
    this.createForceDirectedGraph();
  }

  private createForceDirectedGraph(): void {
    const graph = this.graphService.getGraph();
    const nodes = Array.from(graph.keys());
    const edges: { source: MyNode; target: MyNode }[] = [];
  
    graph.forEach((neighbors, node) => {
      neighbors.forEach(neighbor => {
        if (!edges.some(edge => edge.source === neighbor && edge.target === node)) {
          edges.push({ source: node, target: neighbor });
        }
      });
    });
  
    const width = 800;
    const height = 600;
  
    const svg = d3.select(this.el.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  
    const graphGroup = svg.append('g');
  
    svg.call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.5, 3])
        .on('zoom', (event) => {
          graphGroup.attr('transform', event.transform);
        })
    );
  
    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force('link', d3.forceLink(edges as d3.SimulationLinkDatum<d3.SimulationNodeDatum>[]).id((d: any) => d).distance(100))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2));
  
    const link = graphGroup.append('g')
      .selectAll('line')
      .data(edges)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-width', 2);
  
    const node = graphGroup.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', '#69b3a2')
      .call(
        d3.drag<SVGCircleElement, MyNode>()
          .on('start', (event: any, d: MyNode) => this.dragStarted(event, d, simulation))
          .on('drag', (event: any, d: MyNode) => this.dragged(event, d))
          .on('end', (event: any, d: MyNode) => this.dragEnded(event, d, simulation))
      )
      .on('click', (event: MouseEvent, d: MyNode) => this.showNodeDetails(d));
  
    const label = graphGroup.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('x', 15)
      .attr('y', 5)
      .text(d => this.getNodeLabel(d))
      .style('font-size', '12px');
  
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);
  
      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
  
      label
        .attr('x', d => d.x + 15)
        .attr('y', d => d.y + 5);
    });
  }

  private getNodeLabel(node: MyNode): string {
    const interfaceCount = node.interfaces.length;
    return `Node (${interfaceCount} interfaces)`;
  }

  private dragStarted(event: any, d: MyNode, simulation: any): void {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  private dragged(event: any, d: MyNode): void {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  private dragEnded(event: any, d: MyNode, simulation: any): void {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  private showNodeDetails(node: MyNode): void {
    this.selectedNode = node;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedNode = null;
  }
}