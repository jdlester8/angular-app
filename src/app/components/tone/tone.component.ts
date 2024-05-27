import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-tone',
  standalone: true,
  imports: [],
  templateUrl: './tone.component.html',
  styleUrl: './tone.component.css'
})
export class ToneComponent {
  @ViewChild("canvas") canvas!: ElementRef<HTMLCanvasElement>;
  audioCtx: AudioContext;
  audio: HTMLAudioElement;
  source: MediaElementAudioSourceNode;
  analyser: AnalyserNode;
  freq: Uint8Array;
  redraw: number;

  constructor() {

    this.audioCtx = new AudioContext();
    this.analyser = this.audioCtx.createAnalyser();

    this.audio = new Audio("assets/fade_to_black.mp4");
    this.source = this.audioCtx.createMediaElementSource(this.audio);
    
    this.source.connect(this.audioCtx.destination);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);

    this.analyser.fftSize = 256;
    this.freq = new Uint8Array(this.analyser.frequencyBinCount);
  }

  play() {
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    this.audio.play();
    this.draw();
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.redraw = 0;
  }

  getFrequencyData(): Uint8Array {
    // Get frequency data
    this.analyser.getByteFrequencyData(this.freq);
    return this.freq;
  }

  draw = () => {
    this.redraw = requestAnimationFrame(this.draw);
    const bufferLength = this.analyser.frequencyBinCount;
    this.analyser.getByteFrequencyData(this.freq);

    const WIDTH = 1000;
    const HEIGHT = 300;
    const canvasCtx = this.canvas.nativeElement.getContext("2d")!;
    
    canvasCtx.fillStyle = "rgb(0 0 0)";
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  
    const barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
  
    for (let i = 0; i < bufferLength; i++) {
      barHeight = this.freq[i];
  
      canvasCtx.fillStyle = `rgb(${barHeight + 100} 50 50)`;
      canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
  
      x += barWidth + 1;
    }
  }
}
