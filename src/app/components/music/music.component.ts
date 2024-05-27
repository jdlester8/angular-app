import { Component, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent implements AfterViewInit {

  strings = [
    ["E"],
    ["A"],
    ["D"],
    ["G"],
    ["B"],
    ["E"]
  ];
  fundamentalNotes = ["E", "F", "F#", "G", "Ab", "A", "Bb", "B", "C", "C#", "D", "Eb"];
  guitarNotes: string[] = [];
  frets: Array<string> = Array.from({ length: 22 });
  key: string = "E";
  scale: string = "None";

  constructor() {
    this.initializeGuitarNotes();
  }

  initializeGuitarNotes() {
    //this.guitarNotes = [];
    this.strings.map((string, i) => {
      this.frets.map((fret, j) => {
        let nextNote = this.fundamentalNotes[this.fundamentalNotes.findIndex(x=>x===string[j]) + 1];
        if (nextNote === undefined) {
          nextNote = "E";
        }
        this.strings[i].push(nextNote);
      });
      this.strings[i].splice(22, 6);
    });
    console.log(this.strings);
    /*
    for (let i = 0; i < 11; i++) {
      this.guitarNotes.push(...this.fundamentalNotes);
    }
    */
    //this.guitarNotes.splice(this.guitarNotes.length - 1, 1);
  }

  mathTrunc(n: number) {
    return Math.trunc(n);
  }

  changeTuning(event: any) {
    const index = event.target.options.selectedIndex;
    const tunings = [
      ["E", "F", "F#", "G", "Ab", "A", "Bb", "B", "C", "C#", "D", "Eb"],
      ["D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B", "C", "C#"],
      ["C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B", "C"],
      ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"],
      ["B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb"],
      ["Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A"]
    ];
    const strings = [
      [["E"], ["A"], ["D"], ["G"], ["B"], ["E"]],
      [["D"], ["A"], ["D"], ["G"], ["B"], ["E"]],
      [["C#"], ["Ab"], ["C#"], ["F#"], ["Bb"], ["Eb"]],
      [["C"], ["G"], ["C"], ["F"], ["A"], ["D"]],
      [["B"], ["Bb"], ["B"], ["E"], ["Ab"], ["C#"]],
      [["Bb"], ["F"], ["Bb"], ["Eb"], ["G"], ["C"]],
    ];
    if (index >= 0 && index < tunings.length) {
      //this.fundamentalNotes = tunings[index];
      this.strings = strings[index];
      this.initializeGuitarNotes();
    }
  }

  changeKey(event: any) {
    const index = event.target.options.selectedIndex;
    this.key = this.fundamentalNotes[index];
  }

  changeScale(event: any) {
    const index = event.target.options.selectedIndex;
    const scales = ["None", "Major", "Minor", "MajorPentatonic", "MinorPentatonic"];
    if (index >= 0 && index < scales.length) {
      this.scale = scales[index];
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
    }  else {
      scaleMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    }

    const rootNoteIndex: any = this.fundamentalNotes.findIndex(x => x === this.key)
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
    // D3 Visualization logic goes here
  }
}
