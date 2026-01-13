import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AtlasNotificationsService } from 'atlas-ui-notifications';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'sandbox-toast-doc-page',
  standalone: true,
  imports: [
    AtlasTranslationPipe
  ],
  templateUrl: './toast-doc.page.html',
  styleUrls: [
    './toast-doc.page.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastDocPage {
  private readonly notificationService = inject(AtlasNotificationsService);

  protected fireInfo() {
    this.notificationService.infoKey('sandbox.pages.toast.infoMessage', {
      titleKey: 'sandbox.pages.toast.info',
      durationMs: 0,
      position: 'bottom-center',
    });
  }

  protected fireSuccess() {
    this.notificationService.successKey('sandbox.pages.toast.successMessage', {
      titleKey: 'sandbox.pages.toast.success',
      detailsKey: 'sandbox.pages.toast.successDetails',
      position: 'bottom-center',
      actions: [
        { label: { key: 'ui.common.undo' }, variant: 'primary', onClick: () => console.log('undo'), closeOnClick: true },
        { label: { key: 'ui.common.details' }, variant: 'ghost', href: '/logs' },
      ],
      durationMs: 6000,
    });
  }

  protected fireWarning() {
    this.notificationService.warning('Verifique os campos destacados', {
      title: 'Atenção',
      position: 'top-center',
      durationMs: 5000,
    });
  }

  protected fireErrorSticky() {
    this.notificationService.error('Falha ao salvar', {
      title: 'Erro',
      details: 'Não foi possível concluir a operação. Tente novamente em alguns instantes.',
      position: 'bottom-center',
      durationMs: 0
    });
  }

  protected fireNeutral() {
    this.notificationService.neutral('Default toast', {
      title: 'Erro',
      details: 'Não foi possível concluir a operação. Tente novamente em alguns instantes.',
      position: 'bottom-center',
      durationMs: 0
    });
  }

  protected clear() {
    this.notificationService.clear();
  }
}
