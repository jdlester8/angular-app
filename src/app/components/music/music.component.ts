import { Component, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { AsyncPipe } from '@angular/common';

type Notes = ["E", "F", "F#", "G", "Ab", "A", "Bb", "B", "C", "C#", "D", "Eb"];
type GuitarStrings = ["E", "A", "D", "B", "G", "e"];
/*
interface NoteCircleSelection extends d3.Selection<SVGCircleElement, string, SVGGElement, unknown> {}
interface NoteTextSelection extends d3.Selection<SVGTextElement, string, SVGGElement, unknown> {}
interface GuitarStringSelection extends d3.Selection<SVGLineElement, string, SVGGElement, unknown> {}
*/

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent implements AfterViewInit {

  strings: GuitarStrings = ["E", "A", "D", "B", "G", "e"];
  fundamentalNotes: Notes = ["E", "F", "F#", "G", "Ab", "A", "Bb", "B", "C", "C#", "D", "Eb"];
  guitarNotes = [...Array(11)].flatMap(() => this.fundamentalNotes);
  frets: Array<string> = Array.from({ length: 22 });
  key: string = "E";
  scale: string = "None";

  constructor() {
    this.guitarNotes.forEach((d, i) => {
      const noteIndex = this.fundamentalNotes.findIndex(x => x===d);
        i % 12 === 5 || i % 12 === 11 ? 
          this.guitarNotes[i+1] = this.fundamentalNotes[(noteIndex + 13)%12] :
        i % 12 === 3 || i % 12 === 9 ? 
          this.guitarNotes[i+1] = this.fundamentalNotes[(noteIndex + 4)%12] :
          this.guitarNotes[i+1] = this.fundamentalNotes[(noteIndex + 5)%12];
    });
    this.guitarNotes.splice(this.guitarNotes.length - 1, 1);

    
    /*
    const oscillator = audioCtx.createOscillator();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    */
    /*
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    source.start();
    */
  }

  mathTrunc(n: number) {
    return Math.trunc(n);
  }

  changeKey(event: any) {
    const index = event.target.options.selectedIndex;
    this.key = this.fundamentalNotes[index];
  }

  changeScale(event: any) {
    const index = event.target.options.selectedIndex;
    if (index == 0) {
      this.scale = "None";
    } else if (index == 1) {
      this.scale = "Major";
    } else if (index == 2) {
      this.scale = "Minor";
    } else if (index == 3) {
      this.scale = "MajorPentatonic";
    } else if (index == 4) {
      this.scale = "MinorPentatonic";
    }
  }

  getScale(): Array<string> {
    let scaleMap: Array<number>;
    if (this.scale === "None") {
      scaleMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    } else if (this.scale === "Major") {
        scaleMap = [0, 2, 4, 5, 7, 9, 11];
    } else if (this.scale === "Minor") {
        scaleMap = [0, 2, 3, 5, 7, 8, 10];
    } else if (this.scale === "MajorPentatonic") {
        scaleMap = [0, 2, 4, 7, 9];
    } else if (this.scale === "MinorPentatonic") {
        scaleMap = [0, 3, 5, 7, 10];
    } else {
        scaleMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    }

    const rootNoteIndex: any = this.fundamentalNotes.findIndex(x => x===this.key)
    const scale: string[] = [];

    scaleMap.map((v) => {
      scale.push(this.fundamentalNotes[(rootNoteIndex + v) % 12]);
    });
    return scale;
  }

  isNoteInScale(note: string) {
    return this.getScale().includes(note);
  }

  ngAfterViewInit() {
    /*
    const svg = d3.select<SVGSVGElement, string>("#graph-container");
    const group = svg.append('g');
    const noteCircleElements: NoteCircleSelection = group.selectAll<SVGCircleElement, string>("circle").data(notes);
    const noteTextElements: NoteTextSelection = group.selectAll<SVGTextElement, string>("text").data(notes);
    const stringElements: GuitarStringSelection = group.selectAll<SVGLineElement, string>("line").data(strings);
    //const fretElements: FretSelection = group.selectAll<SVGLineElement, number>("line").data(frets);

    noteCircleElements
    .enter()
    .append("circle")
    .attr("cx", (d, i) => 100 + Math.trunc(i/6)*25)
    .attr("cy", (d, i) => 100 + i%6*20)
    .attr("r", 10)
    .attr("fill", "steelblue");

    stringElements
    .enter()
    .append("line")
    .attr("x1", (d, i) => 100)
    .attr("y1", (d, i) => 100 + i*20)
    .attr("x2", (d, i) => 100 + 800)
    .attr("y2", (d, i) => 100 + i*20)
    .attr("stroke", "black")
    */
  }
}

/*
const getScale = (rootNote: string, notes: Notes, srcScale: Scale): unknown[] => {
  const rootNoteIndex: number = notes.findIndex(note => note === rootNote);
  const dstScale = Array.from({ length: srcScale.length });
  srcScale.map((d, i) => {
    dstScale[i] = notes[(rootNoteIndex+d)%12];
  });
  return dstScale;
};
*/