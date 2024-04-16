import { Component, Input } from '@angular/core';
import { NodeService } from '../../services/node.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { EdgeDirective } from '../../directives/edge.directive';
import { Node, Edge } from '../../interfaces/interfaces';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkContextMenuTrigger, CdkMenuItem, CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-node',
  standalone: true,
  imports: [DragDropModule, CdkContextMenuTrigger, CdkMenuItem, CdkMenu, CdkMenuTrigger, ToolbarComponent, 
    EdgeDirective],
  templateUrl: './node.component.html',
  styleUrl: './node.component.css',
  providers: []
})
export class NodeComponent {

  constructor(public nodeService: NodeService) {
  }

}