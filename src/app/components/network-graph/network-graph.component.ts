import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NodeBehaviorDirective } from '../../directives/networkv3/node-behavior.directive';
import { LinkBehaviorDirective } from '../../directives/networkv3/link-behavior.directive';
import { DragBehaviorDirective } from '../../directives/networkv3/drag-behavior.directive';
import { Networkv3Service } from '../../services/networkv3/networkv3.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { CdkMenuModule } from '@angular/cdk/menu';
import { Graph } from '../../classes/network-graph/graph';
import { Point } from '../../classes/network-graph/point';
import { Node } from '../../classes/network-graph/node';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

type Mode = "Move" | "Link" | "Run";

@Component({
  selector: 'app-network-graph',
  standalone: true,
  imports: [MatButtonModule, MatSelectModule, CdkMenuModule, ReactiveFormsModule, 
    DragBehaviorDirective, NodeBehaviorDirective, LinkBehaviorDirective],
  templateUrl: './network-graph.component.html',
  styleUrls: ['./network-graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworkGraphComponent {

  mode: FormControl;
  graph: Graph;
  selectedNode: Node | null;
  selectLine: { x1: number; y1: number; x2: number; y2: number; } | null;
  selectedNodeCtxMenu: Node | null;
  safeSvg: SafeHtml;

  constructor(private networkService: Networkv3Service, public dialog: MatDialog, 
    private domSanitizer: DomSanitizer) {
    this.mode = new FormControl("Move");
    this.graph = new Graph();
    this.selectedNode = null;
    this.selectLine = null;

    this.mode.valueChanges.subscribe((mode: Mode) => {

    });

    this.loadSVG();
  }

  createNode() {
    const node: Node = new Node("", 100, 100)
    this.graph.addVertex(node);
  }

  onContextMenu(event: MouseEvent, node: Node) {
    this.selectedNodeCtxMenu = node;
  }

  deleteNode() {
    if (this.selectedNodeCtxMenu) {
      const result = this.graph.removeVertex(this.selectedNodeCtxMenu);
      if (result === false) console.error("Error removing node");
    }
  }

  selectNode(node: Node) {
    if (!this.selectedNode && this.mode.value === "Move") {
      this.selectedNode = node;
    } else if (!this.selectedNode && this.mode.value === "Link") {
      this.selectedNode = node;
      this.selectLine = {
        x1: this.selectedNode.x,
        y1: this.selectedNode.y,
        x2: this.selectedNode.x,
        y2: this.selectedNode.y
      };
    }
  }

  drag(point: Point) {
    if (this.selectedNode && this.mode.value === "Move") {
      this.selectedNode.x = point.x;
      this.selectedNode.y = point.y;
    } else if (this.selectedNode && this.mode.value === "Link" && this.selectLine) {
      this.selectLine.x2 = point.x;
      this.selectLine.y2 = point.y;
    }
  }

  dragEnd(point: Point) {
    if (this.selectedNode && this.mode.value === "Move") {
      
    } else if (this.selectedNode && this.mode.value === "Link") {
      const targetNode = this.getNodeByPosition(point);
      if (targetNode) {
        this.graph.addEdge(this.selectedNode, targetNode);
      }
    }
    this.selectedNode = null;
    this.selectLine = null;
  }


  getNodeByPosition(point: Point): Node | null {
    for (const node of this.graph.getVertices()) {
      if (node !== this.selectedNode) {
        if (Math.sqrt(Math.pow((node.x - point.x), 2) + Math.pow((node.y - point.y), 2)) <= 10) {
          return node;
        }
      }
    }
    return null;
  }

  async loadSVG() {
    const response = await fetch("/assets/svg/switch.svg");
    //const svgRouter = await fetch("/assets/svg/router.svg");
    //const svgHost = await fetch("/assets/svg/host.svg");
    
    this.safeSvg = this.domSanitizer.bypassSecurityTrustHtml(await response.text());
  }

}
