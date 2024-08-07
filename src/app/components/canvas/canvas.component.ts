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
  ngAfterViewInit(): void {
      
  }
}
