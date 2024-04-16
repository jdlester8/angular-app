export interface Point {
  x: number,
  y: number
};

export interface Node {
  id: string;
  position: {
    x: number;
    y: number;
  };
  edges: Array<Edge>;
}

export interface Edge {
  src: string;
  dst: string;
}

export interface MACAddress {
  mac: number;
}

export interface IPv4Address {
  addr: number;
}

export interface IPv6Address {
  addr: number;
}

export interface Host extends Node {
  ipv4: IPv4Address;
  ipv6: IPv6Address;
  mac: MACAddress;
  interface: Ethernet;
}

export interface Router extends Node {
  ipv4: IPv4Address;
  ipv6: IPv6Address;
  ports: Ethernet[];
}

export interface Switch extends Node {
  ports: Ethernet[];
}

interface FullDuplex {}
interface HalfDuplex {}
interface TenGEthernet {}
interface OneGEthernet {}
interface TenMbpsEthernet {}

export interface Ethernet {
  duplex: FullDuplex | HalfDuplex;
  datarate: TenGEthernet | OneGEthernet | TenMbpsEthernet;
}

export interface Packet {
  no: number;
  time: number;
  src: string;
  dst: string;
  protocol: string;
  length: number;
  info: string;
}