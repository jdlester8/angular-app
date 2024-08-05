import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.css'
})
export class AudioComponent {

  devices: MediaDeviceInfo[];

  constructor() {
    //let ctx = new AudioContext();
    //new AnalyserNode(ctx);
    navigator.mediaDevices.getUserMedia({audio:true}).then((stream) => {
      console.log(stream);
    })
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.filter((d) => d.kind === "audioinput");
    });
  }
}
