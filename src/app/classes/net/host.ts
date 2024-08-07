import { Application } from "./application";
import { EthernetInterface } from "./ethernet";
import { IPInterface } from "./ip";
import { TCPSocket } from "./tcp";
import { UDPSocket } from "./udp";

export class Host {
    ethernetInterfaces: EthernetInterface[];
    ipInterfaces: IPInterface[];
    sockets: TCPSocket[] | UDPSocket[];
    applications: Application[];
}