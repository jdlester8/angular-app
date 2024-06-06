import { Injectable } from '@angular/core';
import { Router, Switch } from '../../interfaces/interfaces';

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

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  routers: Router[];
  switch: Switch[];
  nodes: Node[] = [];
  links: Link[] = [];
  isEdgeMode: boolean = false;
  fakeSrcNode: Node | undefined;
  realSrcNode: Node | undefined;
  fakeDstNode: Node | undefined;
  isDragging: boolean = false;

  constructor() {

    const node1 = new Node("1", 50, 50);
    const node2 = new Node("2", 100, 100);
    const node3 = new Node("3", 150, 75);
    const node4 = new Node("4", 200, 125);
    const node5 = new Node("5", 250, 75);

    const link1 = new Link(node1, node2);
    const link2 = new Link(node2, node3);
    const link3 = new Link(node3, node4);

    this.nodes.push(node1, node2, node3, node4, node5);
    this.links.push(link1, link2, link3);
  }
}
