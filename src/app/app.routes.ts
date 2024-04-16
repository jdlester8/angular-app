import { Routes } from '@angular/router';
import { NodeComponent } from './components/node/node.component';
import { PacketCaptureComponent } from './components/packet-capture/packet-capture.component';
import { IoGraphComponent } from './components/io-graph/io-graph.component';
import { NetworkGraphComponent } from './components/test/test.component';

export const routes: Routes = [
  { path: 'network', component: NodeComponent },
  { path: 'packet-capture', component: PacketCaptureComponent },
  { path: 'io-graph', component: IoGraphComponent },
  { path: 'd3', component: NetworkGraphComponent }
];
