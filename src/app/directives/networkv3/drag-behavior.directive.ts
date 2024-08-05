import { ChangeDetectorRef, Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { Networkv3Service } from '../../services/networkv3/networkv3.service';
import { Point } from '../../classes/network-graph/point';

@Directive({
  selector: '[dragBehavior]',
  standalone: true
})
export class DragBehaviorDirective {

  @Output() dragNode: EventEmitter<Point>;
  @Output() dragNodeEnd: EventEmitter<Point>;

  constructor() {
    this.dragNode = new EventEmitter<Point>();
    this.dragNodeEnd = new EventEmitter<Point>();
  }

  @HostListener("mousedown", ["$event"])
  svgMouseDown(event: MouseEvent) {
    event.preventDefault();
  }

  @HostListener("mousemove", ["$event.offsetX", "$event.offsetY"])
  svgMouseMove(x: number, y: number) {
    this.dragNode.emit({
      x: x,
      y: y
    });
  }

  @HostListener("mouseup", ["$event.offsetX", "$event.offsetY"])
  svgMouseUp(x: number, y: number) {
    this.dragNodeEnd.emit({
      x: x,
      y: y
    });
  }

}
