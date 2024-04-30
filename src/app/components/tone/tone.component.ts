import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-tone',
  standalone: true,
  imports: [],
  templateUrl: './tone.component.html',
  styleUrl: './tone.component.css'
})
export class ToneComponent implements AfterViewInit {
  @ViewChild("canvas") canvas!: ElementRef<HTMLCanvasElement>;
  audioCtx: AudioContext;
  audio: HTMLAudioElement;
  source: MediaElementAudioSourceNode;
  analyser: AnalyserNode;

  constructor() {
    this.audioCtx = new AudioContext();
    this.analyser = this.audioCtx.createAnalyser();

    this.audio = new Audio("assets/fade_to_black.mp4");
    this.source = this.audioCtx.createMediaElementSource(this.audio);
    
    this.source.connect(this.audioCtx.destination);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);

    this.analyser.fftSize = 2048;
  }

  play() {
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    this.audio.play();

    setTimeout(() => {
      this.getFrequencyData();
    }, 1000);
  }

  getFrequencyData(): Uint8Array {
    // Get frequency data
    const freq: Uint8Array = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(freq);
    return freq;
  }

  draw = () => {
    requestAnimationFrame(this.draw);
    
    const WIDTH = 1000;
    const HEIGHT = 300;
    const canvasCtx = this.canvas.nativeElement.getContext("2d")!;
    const bufferLength = this.analyser.frequencyBinCount;
    const freq = this.getFrequencyData();
  
    canvasCtx.fillStyle = "rgb(0 0 0)";
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  
    const barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
  
    for (let i = 0; i < bufferLength; i++) {
      barHeight = freq[i];
  
      canvasCtx.fillStyle = `rgb(${barHeight + 100} 50 50)`;
      canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
  
      x += barWidth + 1;
    }
  }

  ngAfterViewInit() {
    this.draw();
  }
}
