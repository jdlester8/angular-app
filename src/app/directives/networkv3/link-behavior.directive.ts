import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Networkv3Service } from '../../services/networkv3/networkv3.service';

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

@Directive({
  selector: '[linkBehavior]',
  standalone: true
})
export class LinkBehaviorDirective {

  constructor(private networkService: Networkv3Service) {}

  @HostListener('mousemove', ['$event.offsetX', '$event.offsetY'])
  onMouseMove(x: number, y: number, event: MouseEvent) {
    if (this.networkService.targetNode && this.networkService.mode === "Link") {
      this.networkService.dragLink(x, y);
    }
  }

  @HostListener('mouseup', ['$event.offsetX', '$event.offsetY'])
  onMouseUp(x: number, y: number) {
    if (this.networkService.mode === "Link") {
      this.networkService.releaseLink(x, y);
    }
  }
}
