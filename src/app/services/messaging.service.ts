import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Node, Edge } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class MessagingService implements OnDestroy {

  public node$: Subject<Node>;
  public edge$: Subject<null>;

  constructor() {
    this.node$ = new Subject<Node>();
    this.edge$ = new Subject<null>();
  }

  ngOnDestroy(): void {
    this.node$.unsubscribe();
    this.edge$.unsubscribe();
  }
}
