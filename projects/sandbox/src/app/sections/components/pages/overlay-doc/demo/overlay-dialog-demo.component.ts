import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'sandbox-overlay-dialog-demo',
  standalone: true,
  imports: [AtlasTranslationPipe],
  templateUrl: './overlay-dialog-demo.component.html',
  styleUrls: ['./overlay-dialog-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayDialogDemoComponent { }
