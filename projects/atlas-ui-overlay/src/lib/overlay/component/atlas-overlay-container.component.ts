import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'atlas-overlay-container',
  standalone: true,
  templateUrl: './atlas-overlay-container.component.html',
  styleUrls: [
    './atlas-overlay-container.component.scss',
    './atlas-overlay.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasOverlayContainerComponent {
  constructor(public readonly elRef: ElementRef<HTMLElement>) {}
}
