import { Component, Output, EventEmitter } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: '[app-toolbar]',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  constructor(private messagingService: MessagingService) {

  }

  addNode(): void {
    //this.toolbarAction.emit(event);
    this.messagingService.node$.next({
        id: uuidv4(),
        position: {
          x: Math.floor(Math.random()*400),
          y: Math.floor(Math.random()*300)
        },
        edges: []
      });
  }

  addEdge(): void {
    this.messagingService.edge$.next(null);
  }

}