import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NetworkGraphService } from '../../services/network-graph/network-graph.service';
import { Node } from '../../classes/network-graph/node';

@Directive({
  selector: '[appNodeDirective]',
  standalone: true
})
export class NodeDirective {

  constructor(private el: ElementRef<SVGCircleElement|SVGImageElement>, private networkGraphService: NetworkGraphService) {
    if (this.el.nativeElement instanceof SVGCircleElement) {
      console.log('This is an SVG circle element');
      this.el.nativeElement.setAttribute("cx", "10");
      this.el.nativeElement.setAttribute("cy", "10");
      this.el.nativeElement.setAttribute("r", "10");
    } else if (this.el.nativeElement instanceof SVGImageElement) {
      console.log('This is an SVG image element');
      this.el.nativeElement.setAttribute("x", "50");
      this.el.nativeElement.setAttribute("y", "50");
      this.el.nativeElement.setAttribute("width", "50");
      this.el.nativeElement.setAttribute("height", "50");
      this.el.nativeElement.setAttribute("href", "https://banner2.cleanpng.com/20180322/cxw/kisspng-router-computer-network-diagram-computer-icons-cli-network-diagram-images-5ab46ea718f9f3.4606438615217742471023.jpg");
    }
    const node = new Node("");
    this.networkGraphService.nodeCreated$.next(node);
  }

}
