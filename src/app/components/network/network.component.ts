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
interface CircleSelection extends d3.Selection<SVGCircleElement, Node, SVGGElement, unknown> {}

// Create a selection interface for lines
interface LineSelection extends d3.Selection<SVGLineElement, Link, SVGGElement, unknown> {}


@Component({
  selector: 'app-network-graph',
  templateUrl: 'network.component.html',
  styleUrls: ['./network.component.css'],
  standalone: true,
  imports: [ContextmenuComponent, CdkContextMenuTrigger, CdkMenuItem, CdkMenu, CdkMenuTrigger]
})
export class NetworkComponent {
  
  @ViewChild('context_menu') contextMenu!: TemplateRef<any>;

  constructor(private networkService: NetworkService, private cdr: ChangeDetectorRef, private environmentInjector: EnvironmentInjector, private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) { 
  }
  ngAfterViewInit(): void {
    const svg = d3.select<SVGSVGElement, Node>("#graph-container");

    // Create a group for circles and lines
    const group = svg.append('g');

    // Update data join for circles
    const circles: CircleSelection = group.selectAll<SVGCircleElement, Node>('circle').data(this.networkService.nodes);
    const lines: LineSelection = group.selectAll<SVGLineElement, Link>('line').data(this.networkService.links);

    lines
      .enter()
      .append('line')
      .attr('x1', d => d.node1.x)
      .attr('y1', d => d.node1.y)
      .attr('x2', d => d.node2.x)
      .attr('y2', d => d.node2.y)
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

    // Enter selection for circles
    circles
      .enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 10)
      .attr('fill', 'steelblue')
      .call(dragCircle)
      .on('contextmenu', (e) => {
        e.preventDefault();
        //const component = createComponent(ContextmenuComponent, { environmentInjector: this.environmentInjector });
        //svg.append('app-contextmenu');
        //this.viewContainerRef.createEmbeddedView()
        //this.cdr.detectChanges();
        //this.openContextMenu(1, 1);
        //this.viewContainerRef.createEmbeddedView(this.contextMenu);
      });

    
      //.call(this.dragLine); // Call drag behavior for lines
  }

  openContextMenu = (x: number, y: number): void => {
    // Dynamically create and attach the context menu component
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContextmenuComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);

    // Set initial position of the context menu based on mouse coordinates
    //componentRef.instance.setPosition(x, y);
  }

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