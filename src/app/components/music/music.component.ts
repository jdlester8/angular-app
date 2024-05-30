import { Component } from '@angular/core';
import * as d3 from 'd3';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent {
  strings = [
    ["E"], ["A"], ["D"], ["G"], ["B"], ["E"]
  ];
  fundamentalNotes = ["E", "F", "F#", "G", "Ab", "A", "Bb", "B", "C", "C#", "D", "Eb"];
  frets: Array<string> = Array.from({ length: 22 });
  tuning: FormControl;
  key: FormControl;
  scale: FormControl;
  shape: FormControl;
  highlightRootNote: FormControl;

  constructor() {
    this.initializeGuitarNotes();
    this.tuning = new FormControl("Standard");
    this.key = new FormControl("E");
    this.scale = new FormControl("None");
    this.shape = new FormControl("All");
    this.highlightRootNote = new FormControl(true);

    this.tuning.valueChanges.subscribe((event) => {
      console.log(event);
      const tunings = [
        "Standard",
        "Drop D",
        "Drop C#",
        "Drop C",
        "Drop B",
        "Drop A#"
      ];
      const index = tunings.findIndex(x=>x===event);
      const strings = [
        [["E"], ["A"], ["D"], ["G"], ["B"], ["E"]],
        [["D"], ["A"], ["D"], ["G"], ["B"], ["E"]],
        [["C#"], ["Ab"], ["C#"], ["F#"], ["Bb"], ["Eb"]],
        [["C"], ["G"], ["C"], ["F"], ["A"], ["D"]],
        [["B"], ["Bb"], ["B"], ["E"], ["Ab"], ["C#"]],
        [["Bb"], ["F"], ["Bb"], ["Eb"], ["G"], ["C"]],
      ];
      if (index >= 0 && index < tunings.length) {
        this.strings = strings[index];
        this.initializeGuitarNotes();
      }
    });
    this.key.valueChanges.subscribe(() => {

    });
    this.scale.valueChanges.subscribe(() => {

    });
    this.shape.valueChanges.subscribe(() => {

    });
  }

  initializeGuitarNotes() {
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
  }

  mathTrunc(n: number) {
    return Math.trunc(n);
  }

  getScale(): Array<string> {
    let scaleMap: Array<number>;
    if (this.scale.value === "None") {
      scaleMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    } else if (this.scale.value === "Major") {
      scaleMap = [0, 2, 4, 5, 7, 9, 11];
    } else if (this.scale.value === "Minor") {
      scaleMap = [0, 2, 3, 5, 7, 8, 10];
    } else if (this.scale.value === "MajorPentatonic") {
      scaleMap = [0, 2, 4, 7, 9];
    } else if (this.scale.value === "MinorPentatonic") {
      scaleMap = [0, 3, 5, 7, 10];
    }  else if (this.scale.value === "MajorTriad") {
      scaleMap = [0, 4, 7];
    }  else if (this.scale.value === "MinorTriad") {
      scaleMap = [0, 3, 7];
    }  else {
      scaleMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    }

    const rootNoteIndex: any = this.fundamentalNotes.findIndex(x => x === this.key.value)
    const scale: string[] = [];

    scaleMap.map((v) => {
      scale.push(this.fundamentalNotes[(rootNoteIndex + v) % 12]);
    });

    return scale;
  }

  isNoteInScale(note: string) {
    return this.getScale().includes(note);
  }
}
