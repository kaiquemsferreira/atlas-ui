import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { AtlasOverlayContainerComponent } from 'atlas-ui-overlay';
import { AtlasToastHostComponent } from 'atlas-ui-notifications';

@Component({
  selector: 'app-root',
  imports: [
    AtlasToastHostComponent,
    RouterOutlet,
    AtlasOverlayContainerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent { }
