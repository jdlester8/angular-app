import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as d3 from 'd3';

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

type Mode = "Move" | "Link";

@Injectable({
  providedIn: 'root'
})
export class Networkv3Service {

  network: Map<Node, Node | null>;
  network$: Subject<Map<Node, Node | null>>;
  mode: Mode;
  targetNode: Node | null;
  tempLine: { x1: number; y1: number; x2: number; y2: number; } | null;
  tempLine$: Subject<{ x1: number; y1: number; x2: number; y2: number; } | null>;

  constructor() {
    this.network = new Map();
    this.network$ = new Subject<Map<Node, Node | null>>();
    this.mode = "Move";
    this.targetNode = null;
    this.tempLine = null;
    this.tempLine$ = new Subject<{ x1: number; y1: number; x2: number; y2: number; } | null>();
  }

  setMode(mode: Mode) {
    this.mode = mode;
  }

  createNode(node: Node) {
    this.network.set(node, null);
  }

  nodeClicked(node: Node) {
    this.targetNode = node;

    if (this.mode === "Link") {
      this.tempLine = {
        x1: this.targetNode.x,
        y1: this.targetNode.y,
        x2: this.targetNode.x,
        y2: this.targetNode.y
      };
      this.tempLine$.next(this.tempLine);
    }
  }

  dragNode(x: number, y: number) {
    if (this.targetNode != null) {
      this.targetNode.x = x;
      this.targetNode.y = y;
    }
  }

  dragLink(x: number, y: number) {
    if (this.targetNode !== null) {
      this.tempLine = {
        x1: this.targetNode.x,
        y1: this.targetNode.y,
        x2: x,
        y2: y
      };
      this.tempLine$.next(this.tempLine);
    }
  }

  releaseNode() {
    this.targetNode = null;
  }

  releaseLink(x: number, y: number) {
    if (this.targetNode !== null) {
      const targetNode = this.getNodeByPosition(x, y);
      if (targetNode !== null && this.targetNode !== targetNode) {
        this.network.set(this.targetNode, targetNode);
        this.network$.next(this.network);
      }
    }
    this.targetNode = null;
    this.tempLine = null;
    this.tempLine$.next(null);
  }

  getNode(node: Node): Node | null | undefined {
    return this.network.get(node);
  }

  getNodeById(id: string): Node | null | undefined {
    const foundNode = Array.from(this.network.keys()).find(node => node.id === id);
    return foundNode ?? null;
  }

  getNodeByPosition(x: number, y: number): Node | null {
    for (const node of this.network) {
      if (node[0] !== null) {
        if (Math.sqrt(Math.pow((node[0].x - x), 2) + Math.pow((node[0].y - y), 2)) <= 10) {
          return node[0];
        }
      }
    }
    return null;
  }

}
