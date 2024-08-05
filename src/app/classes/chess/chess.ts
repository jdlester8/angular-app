interface Draggable {
    x: number;
    y: number;
}

export class ChessPiece {
    name: string;
    img: HTMLImageElement;
    file: string;
    rank: number;
    constructor(name: string, img: HTMLImageElement, file: string, rank: number) {
        this.name = name;
        this.img = img;
        this.file = file;
        this.rank = rank;
    }
}

export class MovingChessPiece extends ChessPiece implements Draggable {
    x: number;
    y: number;
    constructor(name: string, img: HTMLImageElement, file: string, rank: number, x: number = 0, y: number = 0) {
        super(name, img, file, rank);
        this.x = x;
        this.y = y;
    }
}

export abstract class Chess {
    static files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    static ranks = [1, 2, 3, 4, 5, 6, 7, 8];
    static squareWidth = 50;
    static squareHeight = 50;
    static pieces: ChessPiece[] = [];
    static selectedPiece: MovingChessPiece | null = null;
    static turn: string = "white";
  
    static fileToXPosition(file: string): number {
      return Chess.files.indexOf(file) * Chess.squareWidth;
    }
  
    static rankToYPosition(rank: number) {
      return (8 - rank) * Chess.squareHeight;
    }
  
    static XPositionToFile(x: number): string {
      let index = Math.floor(x / Chess.squareWidth);
      return Chess.files[index];
    }
  
    static YPositionToRank(y: number): number {
      let index = Math.floor(y / Chess.squareHeight);
      return 8 - index;
    }
  
    async fetchData() {
      for (let chessPieceData of await fetchJSON("/assets/chess-pieces.json")) {
        let name = chessPieceData.name;
        let path = chessPieceData.path;
        let rank = chessPieceData.rank;
        let file = chessPieceData.file;
        let img = await fetchSVG("/assets/" + path);
        Chess.pieces.push(new ChessPiece(name, img, file, rank));
      }
    }
  
    draw(ctx: CanvasRenderingContext2D) {
      let x = 0;
      let y = 0;
      let lightSquare = true;
      for (let file of Chess.files) {
        y = 0;
        lightSquare = !lightSquare;
        for (let rank of Chess.ranks) {
          lightSquare = !lightSquare;
          ctx.fillStyle = lightSquare ? "#eeeed2" : "#769656";
          ctx.fillRect(x*50, y*50, 50, 50);
          y++;
        }
        x++;
      }
      for (let piece of Chess.pieces) {
        if (piece !== Chess.selectedPiece) {
          ctx.drawImage(piece.img, Chess.fileToXPosition(piece.file), Chess.rankToYPosition(piece.rank), Chess.squareWidth, Chess.squareHeight);
        } else {
          ctx.drawImage(piece.img, Chess.selectedPiece.x, Chess.selectedPiece.y, Chess.squareWidth, Chess.squareHeight);
        }
      }
      requestAnimationFrame(() => this.draw(ctx!));
    }

    checkTurn(): boolean {
        return Chess.selectedPiece 
            ? (Chess.turn === "white" && Chess.selectedPiece.name.includes("white")) || (Chess.turn === "black" && Chess.selectedPiece.name.includes("black"))
            : false;
    }

    movePiece(targetFile: string, targetRank: number): boolean {
        if (!Chess.selectedPiece) return false;
        const pieceType = Chess.selectedPiece.name.split('_')[1]; // Assuming names are like "white_pawn"
        const moveFunctions: { [key: string]: (targetFile: string, targetRank: number) => boolean } = {
            pawn: this.movePawn,
            king: this.moveKing,
            queen: this.moveQueen,
            rook: this.moveRook,
            knight: this.moveKnight,
            bishop: this.moveBishop,
        };
        const moveFunction = moveFunctions[pieceType];
        return moveFunction ? moveFunction.call(this, targetFile, targetRank) : false;
    }
  
    movePawn(targetFile: string, targetRank: number): boolean {
        if (!Chess.selectedPiece) return false;

        const piece = Chess.selectedPiece;
        const currentFile = piece.file;
        const currentRank = piece.rank;
        const fileDiff = Chess.files.indexOf(targetFile) - Chess.files.indexOf(currentFile);
        const rankDiff = targetRank - currentRank;
        const isWhite = piece.name.includes("white");
        
        // Basic forward move
        if (fileDiff === 0) {
            if (isWhite && rankDiff === 1) {
                return this.isSquareEmpty(targetFile, targetRank);
            } else if (!isWhite && rankDiff === -1) {
                return this.isSquareEmpty(targetFile, targetRank);
            }
        }

        // First move forward by two squares
        if (fileDiff === 0) {
            if (isWhite && currentRank === 2 && rankDiff === 2) {
                return this.isSquareEmpty(targetFile, targetRank) && this.isSquareEmpty(targetFile, targetRank - 1);
            } else if (!isWhite && currentRank === 7 && rankDiff === -2) {
                return this.isSquareEmpty(targetFile, targetRank) && this.isSquareEmpty(targetFile, targetRank + 1);
            }
        }

        // Diagonal capture
        if (Math.abs(fileDiff) === 1) {
            if (isWhite && rankDiff === 1) {
                return this.isEnemyPiece(targetFile, targetRank);
            } else if (!isWhite && rankDiff === -1) {
                return this.isEnemyPiece(targetFile, targetRank);
            }
        }

        // En passant capture (not fully implemented in this basic example)
        // Add logic for en passant here

        return false;
    }

    // Helper method to check if a square is empty
    isSquareEmpty(file: string, rank: number): boolean {
        return !Chess.pieces.some(piece => piece.file === file && piece.rank === rank);
    }

    // Helper method to check if a piece at a given position is an enemy piece
    isEnemyPiece(file: string, rank: number): boolean {
        const targetPiece = Chess.pieces.find(piece => piece.file === file && piece.rank === rank);
        const index = Chess.pieces.findIndex(piece => piece.file === file && piece.rank === rank);
        if (!targetPiece) return false;
        Chess.pieces.splice(index, 1);
        return (Chess.selectedPiece!.name.includes("white") && targetPiece.name.includes("black")) ||
               (Chess.selectedPiece!.name.includes("black") && targetPiece.name.includes("white"));
    }

    moveKing(targetFile: string, targetRank: number): boolean {
        return false;
    }

    moveQueen(targetFile: string, targetRank: number): boolean {
        return false;
    }

    moveKnight(targetFile: string, targetRank: number): boolean {
        return false;
    }

    moveBishop(targetFile: string, targetRank: number): boolean {
        return false;
    }

    moveRook(targetFile: string, targetRank: number): boolean {
        return false;
    }

    getPieceByPosition(file: string, rank: number): ChessPiece | undefined {
        return Chess.pieces.find(p => p.file === file && p.rank === rank);
    }

    finishTurn() {
        Chess.turn = Chess.turn === "white" ? "black" : "white";
    }
  }

function fetchJSON(path: string): Promise<Array<any>> {
    return new Promise(async (resolve) => {
        let response = await fetch(path);
        resolve(response.json());
    });
}

function fetchSVG(path: string): Promise<HTMLImageElement> {
    return new Promise(async (resolve) => {
        let response = await fetch(path);
        let svgText = await response.text();
        const blob = new Blob([svgText], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        const image = document.createElement('img');
        image.addEventListener('load', () => {
        URL.revokeObjectURL(url);
        resolve(image);
        }, {once: true});
        image.src = url;
    });
}