import { Directive, ElementRef } from '@angular/core';
import { NetworkGraphService } from '../../services/network-graph/network-graph.service';
import { Link } from '../../classes/network-graph/link';

@Directive({
  selector: '[appLinkDirective]',
  standalone: true
})
export class LinkDirective {

  constructor(private el: ElementRef<SVGLineElement>, private networkGraphService: NetworkGraphService) {
    this.el.nativeElement.setAttribute("x1", "0");
    this.el.nativeElement.setAttribute("y1", "0");
    this.el.nativeElement.setAttribute("x2", "0");
    this.el.nativeElement.setAttribute("y2", "0");
    this.el.nativeElement.setAttribute("stroke", "black");
  }

}
