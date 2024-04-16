import { Component } from '@angular/core';
import * as d3 from "d3";
import { Packet } from '../../interfaces/interfaces'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-packet-capture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packet-capture.component.html',
  styleUrl: './packet-capture.component.css',
  providers: []
})
export class PacketCaptureComponent {

  packets: Array<Packet>;

  constructor() {

      this.packets = [
      {
          no: 1,
          time: 1,
          src: "127.0.0.1",
          dst: "127.0.0.1",
          protocol: "TCP",
          length: 1,
          info: "hello world"
      },
      {
          no: 1,
          time: 1,
          src: "127.0.0.1",
          dst: "127.0.0.1",
          protocol: "UDP",
          length: 1,
          info: "hello world"
      }];
  }

}
