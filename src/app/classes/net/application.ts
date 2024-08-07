import { TCPStream } from "./tcp";
import { UDPStream } from "./udp";

export class Application {
    socket: TCPStream | UDPStream;
}