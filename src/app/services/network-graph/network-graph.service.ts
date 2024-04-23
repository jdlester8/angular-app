import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Node } from '../../classes/network-graph/node';
import { Link } from '../../classes/network-graph/link';

@Injectable({
  providedIn: 'root'
})
export class NetworkGraphService {

  nodes: Node[];
  links: Link[];
  isNodeMode: boolean;

  nodeCreated$: Subject<Node>;
  nodeDragStarted$: Subject<Node>;
  nodeDragged$: Subject<Node>;
  nodeDragEnded$: Subject<Node>;
  linkCreated$: Subject<Link>;
  linkDragged$: Subject<Link>;
  linkDragStarted$: Subject<Link>;
  linkDragEnded$: Subject<Link>;
  isNodeMode$: Subject<boolean>;

  constructor() {
    this.nodes = [];
    this.links = [];
    this.isNodeMode = true;

    this.nodeCreated$ = new Subject<Node>();
    this.nodeDragStarted$ = new Subject<Node>();
    this.nodeDragged$ = new Subject<Node>();
    this.nodeDragEnded$ = new Subject<Node>();
    this.linkCreated$ = new Subject<Link>();
    this.linkDragged$ = new Subject<Link>();
    this.linkDragStarted$ = new Subject<Link>();
    this.linkDragEnded$ = new Subject<Link>();
    this.isNodeMode$ = new Subject<boolean>();

    this.nodeCreated$.subscribe((node: Node) => {
      this.nodes.push(node);
    });

    this.nodeDragged$.subscribe((node: Node) => {
      const i = this.nodes.findIndex((x) => x.id === node.id);
      this.nodes[i].x = 0;
      this.nodes[i].y = 0;
    });

    this.linkCreated$.subscribe((link: Link) => {
      this.links.push(link);
    });

    this.linkDragged$.subscribe((link: Link) => {
      const i = this.links.findIndex((x) => x.id === link.id);
      this.links[i].x = 0;
      this.links[i].y = 0;
    });

    this.isNodeMode$.subscribe((isNodeMode: boolean) => {
      this.isNodeMode = isNodeMode;
    });
  }
}
