import { Injectable, Type } from '@angular/core';
import { Node, Router, Switch, IPv4Address, IPv6Address } from '../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { HttpService } from './http.service';
import { MessagingService } from './messaging.service';

@Injectable({providedIn: 'root'})
export class NodeService {

  nodes: Array<Node|Router|Switch>;
  routers: Router[];
  switch: Switch[];
  isEdgeMode: boolean = false;
  fakeSrcNode: Node | undefined;
  realSrcNode: Node | undefined;
  fakeDstNode: Node | undefined;
  isDragging: boolean = false;

  constructor(private http: HttpService, private messagingService: MessagingService) {
    this.messagingService.node$.subscribe((node) => {
      this.isEdgeMode = false;
      this.nodes.push(node);
    });
    this.messagingService.edge$.subscribe(() => {
      this.isEdgeMode = !this.isEdgeMode;
    });
    this.nodes = [];
    /*
    this.nodes = [
      {
        id: "1",
        position: {
          x: 100,
          y: 100
        },
        edges: [{
          src: "1",
          dst: "2"
        }]
      },
      {
        id: "2",
        position: {
          x: 200,
          y: 100
        },
        edges: [{
          src: "2",
          dst: "1"
        }]
      },
      {
        id: "3",
        position: {
          x: 300,
          y: 300
        },
        edges: [{
          src: "3",
          dst: "1"
        },
        {
          src: "3",
          dst: "2"
        }]
      },
      {
        id: "5",
        position: {
          x: 400,
          y: 10
        },
        edges: [{
          src: "1",
          dst: "2"
        }],
        ipv4: { addr: 5 },
        ipv6: { addr: 5 },
        ports: []
      }
    ];
    */
    this.routers = [];
  }


  /* EVENTS */
  nodeDragMoved(event: any): void {
    const node = this.getNodeByID(event.source.element.nativeElement.id)!;
    node.position = event.pointerPosition;
  }

  /* TODO check if edge already exists */
  edgeDragStopped(event: any): void {
    const realTargetDstNode = this.getNodeByPosition(event.x, event.y);

    if (realTargetDstNode != undefined && this.realSrcNode != undefined) {
      this.realSrcNode.edges.push({
        src: this.fakeSrcNode!.id,
        dst: realTargetDstNode.id
      });
    } 

    /* cleanup */
    this.isDragging = false;
    this.realSrcNode = undefined;
    this.fakeSrcNode = undefined;
    this.fakeDstNode = undefined;
  }

  edgeDragMoved(event: any): void {
    if (this.isDragging) {
      this.fakeDstNode!.position.x = event.x;
      this.fakeDstNode!.position.y = event.y;
    }
  }

  edgeDragStarted(event: any): void {
    this.realSrcNode = this.getNodeByPosition(event.x, event.y);

    const fakeSrcNode: Node = {
      id: uuidv4(),
      position: {
        x: event.x,
        y: event.y
      },
      edges: []
    };

    const fakeDstNode: Node = {
      id: uuidv4(),
      position: {
        x: event.x,
        y: event.y
      },
      edges: []
    };

    if (this.realSrcNode != undefined) {

      this.isDragging = true;

      fakeSrcNode.edges.push({
        src: fakeSrcNode.id,
        dst: fakeDstNode.id
      });

      this.fakeSrcNode = fakeSrcNode;
      this.fakeDstNode = fakeDstNode;
    }
  }

  /* METHODS */
  setNode(x: number, y: number): void {
    const node: Node = {
      id: uuidv4(),
      position: {
        x: x,
        y: y
      },
      edges: []
    };
    this.nodes.push(node);
  }

  getNodeByID(id: string): Node | undefined {
    const i = this.nodes.findIndex((x) => x.id === id);
    return this.nodes[i];
  }

  getNodeByPosition(x: number, y: number): Node | undefined {
    const i = this.nodes.findIndex((node) => 
      (Math.sqrt( Math.pow((node.position.x-x), 2) + Math.pow((node.position.y-y), 2))) <= 10
    );
    return this.nodes[i];
  }

  getNodeByPositionRect(x: number, y: number): Node | undefined {
    const i = this.nodes.findIndex((node) => 
      x >= node.position.x && y >= node.position.y
      && x <= node.position.x + 10 && y <= node.position.y + 10
    );
    return this.nodes[i];
  }

  getNodes(): Node[] {
    return this.nodes;
  }
}