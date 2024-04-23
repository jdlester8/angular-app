import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSvgDirective]',
  standalone: true
})
export class SvgDirective {

  constructor() { }

  @HostListener("mousedown")
  mouseDown() {
    console.log("mouse down");
  }

  @HostListener("mouseup")
  mouseUp() {
    console.log("mouse up")
  }

}
