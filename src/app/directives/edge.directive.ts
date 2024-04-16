import { Directive, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { Point } from '../interfaces/interfaces'
@Directive({
  selector: '[appEdge]',
  standalone: true
})
export class EdgeDirective {

  isDragging: boolean = false;
  @Output("edgeDragStarted") edgeDragStarted = new EventEmitter<Point>();
  @Output("edgeDragMoved") edgeDragMoved = new EventEmitter<Point>();
  @Output("edgeDragStopped") edgeDragStopped = new EventEmitter<Point>();

  constructor(private elem: ElementRef) {

  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.edgeDragStarted.emit({
      x: event.x,
      y: event.y
    });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.edgeDragMoved.emit({
        x: event.x,
        y: event.y
      });
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.isDragging = false;
    this.edgeDragStopped.emit({
      x: event.x,
      y: event.y
    });
  }

}