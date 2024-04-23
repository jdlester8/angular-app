import { Component } from '@angular/core';
import { NodeDirective } from '../../directives/node/node.directive';
import { LinkDirective } from '../../directives/link/link.directive';
import { SvgDirective } from '../../directives/svg/svg.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkContextMenuTrigger, CdkMenuItem, CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import { NetworkGraphService } from '../../services/network-graph/network-graph.service';
import { Node } from '../../classes/network-graph/node';
import { Link } from '../../classes/network-graph/link';

@Component({
  selector: 'app-network-graph',
  standalone: true,
  imports: [SvgDirective, NodeDirective, LinkDirective, DragDropModule, CdkContextMenuTrigger, CdkMenuItem, CdkMenu, CdkMenuTrigger],
  templateUrl: './network-graph.component.html',
  styleUrl: './network-graph.component.css'
})
export class NetworkGraphComponent {

  nodes: Node[];
  links: Link[];
  isNodeMode: boolean;

  constructor(private networkGraphService: NetworkGraphService) {

    /*
    this.nodes = [];
    this.links = [];
    this.isNodeMode = true;
    */
  }

  /*
  nodeCreated(event: any) {
    const node = { id: "" };
    this.isNodeMode = true;
    this.networkGraphService.isNodeMode$.next(true);
    this.nodes.push(node);
    this.networkGraphService.nodeCreated$.next(node);
    console.log(event);
  }

  nodeDragStarted(event: any) {
    console.log(event);
  }

  nodeDragged(event: any) {
    const node = { id: "" };
    this.networkGraphService.nodeDragged$.next(node);
  }

  nodeDragEnded(event: any) {
    console.log(event);
  }

  linkCreated(event: any) {
    const link = {};
    this.links.push(link);
    this.isNodeMode = false;
    this.networkGraphService.isNodeMode$.next(false);
    this.networkGraphService.linkCreated$.next(link);
  }

  linkDragStarted(event: any) {
    console.log(event);
  }

  linkDragged(event: any) {
    this.networkGraphService.linkDragged$.next(event);
  }

  linkDragEnded(event: any) {
    console.log(event);
  }
  */
}
