import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { SwitchComponent } from '../switch/switch.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [SwitchComponent, AsyncPipe],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild("canvas") canvas: ElementRef<HTMLCanvasElement>;
  ctx$: BehaviorSubject<CanvasRenderingContext2D | null>;

  constructor(private cdr: ChangeDetectorRef) {
    this.ctx$ = new BehaviorSubject<CanvasRenderingContext2D | null>(null);
  }

  ngAfterViewInit() {
    this.ctx$.next(this.canvas.nativeElement.getContext("2d"));
    this.cdr.detectChanges();
  }
}
