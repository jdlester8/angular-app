import { Injectable } from '@angular/core';

function validateRange(value: number, max: number, name: string) {
  if (value < 0) {
    throw new TypeError(`${name} must be greater than or equal to 0.`);
  }
  if (value >= max) {
    throw new TypeError(`${name} must be less than ${max}.`);
  }
}

export class IPAddress {
  addr: number;

  constructor(addr: string | number) {
    if (typeof addr === "string") {
      this.addr = this.parseIPAddress(addr);
    } else {
      validateRange(addr, Math.pow(2, 32), "IPAddress");
      this.addr = addr;
    }
  }

  private parseIPAddress(ip: string): number {
    const octets = ip.split(".");
    if (octets.length !== 4) {
      throw new TypeError("Invalid IPv4 address format.");
    }
  
    const numericAddress = octets.reduce((acc, octet, index) => {
      const part = parseInt(octet, 10);
      if (isNaN(part) || part < 0 || part > 255) {
        throw new TypeError(`Invalid value in IPv4 address at position ${index + 1}.`);
      }
      return (acc << 8) | part; // Shift left by 8 bits and add the current octet.
    }, 0);
  
    // Ensure the address is treated as an unsigned 32-bit integer
    return numericAddress >>> 0; // Unsigned 32-bit integer
  }

  toString(): string {
    return [
      (this.addr >> 24) & 0xff,
      (this.addr >> 16) & 0xff,
      (this.addr >> 8) & 0xff,
      this.addr & 0xff,
    ].join(".");
  }
}

export class MACAddress {
  addr: number;
  constructor(addr: number) {
    validateRange(addr, Math.pow(2, 48), "MACAddress");
    this.addr = addr;
  }
}

export class Netmask {
  addr: number;

  constructor(cidr: number) {
    validateRange(cidr, 32, "Netmask");
    this.addr = (0xffffffff << (32 - cidr)) >>> 0; // Convert CIDR to bitmask
  }

  toString(): string {
    return [
      (this.addr >> 24) & 0xff,
      (this.addr >> 16) & 0xff,
      (this.addr >> 8) & 0xff,
      this.addr & 0xff,
    ].join(".");
  }
}

export class Interface {
  macAddr: MACAddress;
  ipAddr?: IPAddress;
  rxQueue: Uint8Array[];
  txQueue: Uint8Array[];

  constructor(macAddr: MACAddress, ipAddr?: IPAddress) {
    this.macAddr = macAddr;
    this.ipAddr = ipAddr;
    this.rxQueue = [];
    this.txQueue = [];
  }
}

export class MyNode {
  routing_table: Map<IPAddress, IPAddress>;
  arp_table: Map<IPAddress, MACAddress>;
  mac_table: Map<MACAddress, Interface>;
  interfaces: Interface[];
  x: number;
  y: number;
  fx: number | null;
  fy: number | null;

  constructor(graphService: GraphService, ip?: IPAddress, mac?: MACAddress) {
    this.routing_table = new Map();
    this.arp_table = new Map();
    this.mac_table = new Map();
    this.interfaces = [];
    this.x = 100;
    this.y = 100;
    this.fx = Math.random() * 800;
    this.fy = Math.random() * 600;
    if (ip && mac) {
      this.addInterface(ip, mac);
    }
    graphService.addNode(this);
  }

  addInterface(ip: IPAddress, mac: MACAddress) {
    const intf = new Interface(mac, ip);
    this.interfaces.push(intf);
    this.mac_table.set(mac, intf);
  }
}

export class Host extends MyNode {
  constructor(graphService: GraphService, ip: IPAddress) {
    super(graphService, ip);
  }
}

export class Router extends MyNode {
  constructor(graphService: GraphService, ip: IPAddress) {
    super(graphService, ip);
  }
}

export class Network {
  network: IPAddress;
  netmask: Netmask;

  constructor(graphService: GraphService, network: IPAddress, netmask: Netmask) {
    this.network = network;
    this.netmask = netmask;
  }
}

export class BusNetwork extends Network {
  constructor(graphService: GraphService, network: IPAddress, netmask: Netmask) {
    super(graphService, network, netmask);
    const hosts = Array.from({ length: 10 }, (_, i) => new Host(graphService, new IPAddress(network.addr + 2 + i)));
    const r1 = new Router(graphService, new IPAddress(network.addr + 1));
    graphService.addEdge([r1, ...hosts]);
  }
}

export class PointToPointNetwork extends Network {
  constructor(graphService: GraphService, network: IPAddress, netmask: Netmask) {
    super(graphService, network, netmask);
    const r1 = new Router(graphService, new IPAddress(network.addr + 1));
    const r2 = new Router(graphService, new IPAddress(network.addr + 2));
    graphService.addEdge([r1, r2]);
  }
}

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private graph: Map<MyNode, MyNode[]> = new Map();

  constructor() {
    const n1 = new BusNetwork(this, new IPAddress("192.168.1.0"), new Netmask(24));
    const n2 = new PointToPointNetwork(this, new IPAddress("192.168.2.0"), new Netmask(30));
  }

  addNode(node: MyNode): void {
    this.graph.set(node, []);
  }

  addEdge(nodes: MyNode[]): void {
    if (nodes.length < 2) {
      throw new Error("addEdge requires at least two nodes.");
    }
  
    const [centralNode, ...otherNodes] = nodes;

    if (!this.graph.has(centralNode)) {
      throw new Error("The central node must exist in the graph.");
    }
  
    for (const node of otherNodes) {
      if (!this.graph.has(node)) {
        throw new Error("All nodes must exist in the graph.");
      }
  
      this.graph.get(centralNode)?.push(node);
      this.graph.get(node)?.push(centralNode);
    }
  }

  getGraph(): Map<MyNode, MyNode[]> {
    return this.graph;
  }
}