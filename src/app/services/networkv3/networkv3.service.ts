import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type Mode = "Move" | "Link";

@Injectable({
  providedIn: 'root'
})
export class Networkv3Service {

  network: Map<Node, Node | null>;

  constructor() {}

}
