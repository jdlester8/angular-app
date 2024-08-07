export class TCPStream {
    header: TCPHeader;
    data: number;
}

export class TCPHeader {
    sourcePort: number;
    destinationPort: number;
    sequenceNumber: number;
    acknowledgementNumber: number;
    headerLength: number;
    reserved: number;
    flags: number;
    window: number;
    checksum: number;
    urgentPointer: number;
    options: number;
}

export class TCPSocket {
    
}