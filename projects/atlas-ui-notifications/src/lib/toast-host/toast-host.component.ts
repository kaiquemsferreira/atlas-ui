import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';

import { AtlasToast, AtlasToastAction, AtlasToastPosition, AtlasToastVariant } from '../notification-types';
import { AtlasNotificationsService } from '../atlas-notifications.service';

@Component({
  selector: 'atlas-toast-host',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass
  ],
  templateUrl: './toast-host.component.html',
  styleUrls: [
    './toast-host.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasToastHostComponent {

  public readonly notificationService = inject(AtlasNotificationsService);

  protected readonly positions: AtlasToastPosition[] = [
    'top-right',
    'top-center',
    'top-left',
    'bottom-right',
    'bottom-center',
    'bottom-left'
  ];

  protected trackById(_: number, t: AtlasToast): string {
    return t.id;
  }

  protected trackByPosition(_: number, p: AtlasToastPosition): AtlasToastPosition {
    return p;
  }

  protected iconClass(v: AtlasToastVariant): string {
    switch (v) {
      case 'success': return 'ph-check';
      case 'error': return 'ph-x';
      case 'warning': return 'ph-warning';
      case 'info': return 'ph-exclamation-mark';
      default: return 'ph-bell';
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

  protected dismiss(id: string): void {
    this.notificationService.dismiss(id);
  }
}
