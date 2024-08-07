import { EthernetInterface } from "./ethernet";
import { IPInterface } from "./ip";

export class Router {
    ethernetInterfaces: EthernetInterface[];
    ipInterfaces: IPInterface[];
}