import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, provideRouter } from '@angular/router';
import { NodeComponent } from './components/node/node.component';
import { PacketCaptureComponent } from './components/packet-capture/packet-capture.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NodeComponent, PacketCaptureComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: []
})
export class AppComponent {

  constructor() {

  }

}