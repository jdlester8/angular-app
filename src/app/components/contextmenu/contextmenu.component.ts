import { Component } from '@angular/core';
import { CdkContextMenuTrigger, CdkMenuItem, CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
@Component({
  selector: 'app-contextmenu',
  standalone: true,
  imports: [CdkContextMenuTrigger, CdkMenuItem, CdkMenu, CdkMenuTrigger],
  templateUrl: './contextmenu.component.html',
  styleUrl: './contextmenu.component.css'
})
export class ContextmenuComponent {
  constructor() {
    
  }
}
