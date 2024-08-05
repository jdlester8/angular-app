var pcap = require('pcap'),
pcap_session = pcap.createSession('en0', {
  promiscuous: true,
  monitor: true
});
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  pcap_session.on('packet', function (raw_packet: any) {
    var packet = pcap.decode.packet(raw_packet);
    packet = JSON.stringify(packet);
    ws.send(packet);
});
});

