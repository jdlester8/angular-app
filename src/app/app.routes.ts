import { Routes } from '@angular/router';
import { NodeComponent } from './components/node/node.component';
import { PacketCaptureComponent } from './components/packet-capture/packet-capture.component';
import { IoGraphComponent } from './components/io-graph/io-graph.component';
import { NetworkComponent } from './components/network/network.component';
import { NetworkGraphComponent } from './components/network-graph/network-graph.component';
import { MusicComponent } from './components/music/music.component';
import { ToneComponent } from './components/tone/tone.component';
import { TimeGraphComponent } from './components/time-graph/time-graph.component';

export const routes: Routes = [
  { path: 'network', component: NodeComponent },
  { path: 'packet-capture', component: PacketCaptureComponent },
  { path: 'io-graph', component: IoGraphComponent },
  { path: 'd3', component: NetworkComponent },
  { path: 'network-graph', component: NetworkGraphComponent },
  { path: 'music', component: MusicComponent},
  { path: 'tone', component: ToneComponent},
  { path: 'clock', component: TimeGraphComponent}
];
