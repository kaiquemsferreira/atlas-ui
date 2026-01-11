import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { AtlasToastHostComponent } from 'atlas-ui-notifications';

@Component({
  selector: 'app-root',
  imports: [
    AtlasToastHostComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent { }
