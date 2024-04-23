import { Component, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

type Notes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
type GuitarStrings = ["E", "A", "D", "B", "G", "e"];
type Octave = [0, 1, 2, 3, 4, 5, 6, 7];
type MajorScale = [0, 2, 4, 5, 7, 9, 11];
type MinorScale = [0, 2, 3, 5, 7, 8, 10];
type MajorPentatonicScale = [0, 2, 4, 7, 9];
type MinorPentatonicScale = [0, 3, 5, 7, 10];
type Scale = Octave | MajorScale | MinorScale | MajorPentatonicScale | MinorPentatonicScale;

/*
interface NoteCircleSelection extends d3.Selection<SVGCircleElement, string, SVGGElement, unknown> {}
interface NoteTextSelection extends d3.Selection<SVGTextElement, string, SVGGElement, unknown> {}
interface GuitarStringSelection extends d3.Selection<SVGLineElement, string, SVGGElement, unknown> {}
*/

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent implements AfterViewInit {
[x: string]: any;

  strings: GuitarStrings = ["E", "A", "D", "B", "G", "e"];
  fundamentalNotes: Notes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
  guitarNotes = [...Array(11)].flatMap(() => this.fundamentalNotes);
  frets = Array.from({ length: 22 });
  
  constructor() {
    /*
    const notes: Notes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
    const strings: GuitarStrings = ["E", "A", "D", "B", "G", "e"];
    const octave: Octave = [0, 1, 2, 3, 4, 5, 6, 7];
    const scale = getScale("E", notes, octave);
    const fretboard = [...Array(8)].flatMap(() => scale);
    console.log(fretboard);
    */
  }

  mathTrunc(n: number) {
    return Math.trunc(n);
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


const getScale = (rootNote: string, notes: Notes, srcScale: Scale): unknown[] => {
  const rootNoteIndex: number = notes.findIndex(note => note === rootNote);
  const dstScale = Array.from({ length: srcScale.length });
  srcScale.map((d, i) => {
    dstScale[i] = notes[(rootNoteIndex+d)%12];
  });
  return dstScale;
};

/*
const notes: Notes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const octave: Octave = [0, 1, 2, 3, 4, 5, 6, 7];
const scale = getScale("E", notes, octave);
const fretboard = [...Array(8)].flatMap(() => scale);
console.log(fretboard);

const srcNotes: Notes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const dstNotes: string[] = Array.from({ length: 30 });
dstNotes.map((d, i) => {
  dstNotes[i] = srcNotes[i%12];
});
console.log(dstNotes);
*/
