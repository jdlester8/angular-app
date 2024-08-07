import { Interface } from "./interface";

export class EthernetFrame {
    
}

export class EthernetHeader {
    preamble: number;
    destinationAddress: number;
    sourceAddress: number;
    type: number;
    data: number;
    fcs: number; // cyclic redundancy check
}

export class EthernetInterface extends Interface {
    constructor() {
        super();
    }
}