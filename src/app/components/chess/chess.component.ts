import { AfterViewInit, Component } from '@angular/core';
import { Chess, MovingChessPiece } from '../../classes/chess/chess';

@Component({
  selector: 'app-chess',
  standalone: true,
  imports: [],
  templateUrl: './chess.component.html',
  styleUrl: './chess.component.css'
})
export class ChessComponent extends Chess implements AfterViewInit {

  constructor() {
    super();
  }

  async ngAfterViewInit() {
    let canvas = document.getElementById("board") as HTMLCanvasElement;
    canvas.width = Chess.squareWidth*Chess.files.length;
    canvas.height = Chess.squareHeight*Chess.ranks.length;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    await this.fetchData();
    this.draw(ctx);
  }

  selectPiece(e: PointerEvent) {
      Chess.selectedPiece = Chess.pieces.find(piece => 
        piece.file === Chess.XPositionToFile(e.offsetX) &&
        piece.rank === Chess.YPositionToRank(e.offsetY)
      ) as MovingChessPiece;
      if (Chess.selectedPiece && this.checkTurn()) {
        Chess.selectedPiece.x = e.offsetX - Chess.squareWidth/2;
        Chess.selectedPiece.y = e.offsetY - Chess.squareHeight/2;
      } else {
        Chess.selectedPiece = null;
      }
  }

  dragPiece(e: PointerEvent) {
    if (Chess.selectedPiece && this.checkTurn()) {
      Chess.selectedPiece.x = e.offsetX - Chess.squareWidth/2;
      Chess.selectedPiece.y = e.offsetY - Chess.squareHeight/2;
    }
  }

  releasePiece(e: PointerEvent) {
    if (Chess.selectedPiece && this.checkTurn()) {
      if (this.movePiece(Chess.XPositionToFile(e.offsetX), Chess.YPositionToRank(e.offsetY))) {
        Chess.pieces.find(p => p.name === Chess.selectedPiece!.name)!.file = Chess.XPositionToFile(e.offsetX);
        Chess.pieces.find(p => p.name === Chess.selectedPiece!.name)!.rank = Chess.YPositionToRank(e.offsetY);
        this.finishTurn();
      }
      Chess.selectedPiece = null;
    }
  }
}