import { Routes } from '@angular/router';
import { MusicComponent } from './components/music/music.component';
import { NetworkComponent } from './components/network/network.component';

export const routes: Routes = [
  { path: 'music', component: MusicComponent},
  { path: 'network', component: NetworkComponent},
];
