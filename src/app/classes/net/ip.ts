export class IPPacket {
    
}

export class IPHeader {
    version: number;
    headerLength: number;
    tos: number;
    totalLength: number;
    id: number;
    flags: number;
    fragmentOffset: number;
    ttl: number;
    protocol: number;
    headerChecksum: number;
    sourceAddress: number;
    destinationAddress: number;
    options: number;
    data: number;
}

export class IPInterface {
    
}