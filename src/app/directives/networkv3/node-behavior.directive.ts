import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Networkv3Service } from '../../services/networkv3/networkv3.service';
import { Node } from '../../classes/network-graph/node';

@Directive({
  selector: '[nodeBehavior]',
  standalone: true
})
export class NodeBehaviorDirective {
  
  @Input() node: Node;
  @Output() nodeSelected: EventEmitter<Node>;

  constructor(private networkService: Networkv3Service) {
    this.nodeSelected = new EventEmitter<Node>();
  }

  @HostListener("mousedown", ["$event"])
  nodeOnClick() {
    this.nodeSelected.emit(this.node);
    //this.networkService.nodeClicked(this.node);
  }

}
