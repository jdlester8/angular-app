import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-network',
  standalone: true,
  imports: [],
  templateUrl: './network.component.html',
  styleUrl: './network.component.css'
})
export class NetworkComponent implements AfterViewInit {
  constructor() {

  }

  ngAfterViewInit(): void {
      let canvas = document.getElementById("canvas") as HTMLCanvasElement;
      canvas.width = 640;
      canvas.height = 480;
      let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      requestAnimationFrame(() => this.draw(ctx));
  }

  draw(ctx: CanvasRenderingContext2D) {
    requestAnimationFrame(() => this.draw(ctx));
  }
}
