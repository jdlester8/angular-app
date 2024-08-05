import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-math',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './packet-sniffer.component.html',
  styleUrl: './packet-sniffer.component.css'
})
export class PacketSnifferComponent {

  endpoint: FormControl;
  frames: any[];
  socket: WebSocket;
  selectedFrame: any;

  constructor() {
    this.endpoint = new FormControl("ws://localhost:8080");
    this.frames = [];
    this.socket = new WebSocket("ws://localhost:8080");
    this.selectedFrame = null;
    this.socket.onopen = () => {
      console.log("connection opened");
    };
    this.socket.onmessage = (data: any) => {
      const frame = JSON.parse(data.data);
      this.frames.push(frame);
    };
    this.socket.onclose = () => {
      console.log("socket closed");
    };
  }

  selectFrame(frame: any) {
    console.log(frame);
    this.selectedFrame = frame.payload;
  }

  getProtocol(frame: any) {
    if (frame.payload.payload.protocol === 6) {
      return "TCP";
    } else if (frame.payload.payload.protocol === 17) {
      return "UDP";
    } else if (frame.payload.ethertype === 2054) {
      return "ARP";
    }
    return "None";
  }

  getProtocolBackgroundColor(frame: any) {
    if (frame.payload.payload.protocol === 6) {
      return "lightgreen";
    } else if (frame.payload.payload.protocol === 17) {
      return "lightblue";
    } else if (frame.payload.ethertype === 34525) {
      return "lavender";
    } else if (frame.payload.ethertype === 2054) {
      return "lightbrown";
    }
    return "white";
  }

}