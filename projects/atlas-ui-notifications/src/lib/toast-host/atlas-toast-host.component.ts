import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';

import { AtlasToastAction, AtlasToastPosition, AtlasToastText, AtlasToastVariant } from '../model/atlas-notification-types';
import { AtlasNotificationsService } from '../service/atlas-notifications.service';
import { AtlasButtonDirective } from 'atlas-ui-button';
import { ATLAS_I18N } from 'atlas-ui-i18n';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'atlas-toast-host',
  standalone: true,
  imports: [
    AtlasButtonDirective,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './atlas-toast-host.component.html',
  styleUrls: ['./atlas-toast-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasToastHostComponent {
  protected readonly notificationService = inject(AtlasNotificationsService);
  protected readonly translationService = inject(ATLAS_I18N);
  protected readonly positions: AtlasToastPosition[] = [
    'top-right',
    'top-center',
    'top-left',
    'bottom-right',
    'bottom-center',
    'bottom-left'
  ];

  protected iconClass(v: AtlasToastVariant) {
    switch (v) {
      case 'success': return { icon: 'ph-check', color: 'success' };
      case 'error': return { icon: 'ph-x', color: 'error' };
      case 'warning': return { icon: 'ph-warning', color: 'warning' };
      case 'info': return { icon: 'ph-exclamation-mark', color: 'info' };
      default: return { icon: 'ph-bell', color: 'primary' };
    }
  }

  protected isPaused(id: string): boolean {
    return this.notificationService.getTimerState(id)?.paused ?? false;
  }

  protected onAction(toastId: string, action: AtlasToastAction): void {
    action.onClick?.();
    if (action.closeOnClick) {
      this.notificationService.dismiss(toastId);
    }
  }

  protected resolveText$(t: AtlasToastText): Observable<string> {
    if ('text' in t) {
      return of(t.text);
    }
    return this.translationService.translate$(t.key, t.params);
  }
}
