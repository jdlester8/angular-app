import { Draggable } from "./draggable";

export class Node implements Draggable {
    
    id: string;
    x: number;
    y: number;

    constructor(id: string, x: number, y: number) {
        this.x = x;
        this.y = y;
    }

}