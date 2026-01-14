import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AtlasCodeBlockComponent, AtlasInlineCodeComponent } from 'atlas-ui-code';
import { AtlasDocPageComponent, AtlasDocSectionComponent } from 'atlas-ui-layout';
import { AtlasNotificationsService } from 'atlas-ui-notifications';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'sandbox-toast-doc-page',
  standalone: true,
  imports: [
    AtlasTranslationPipe,
    AtlasDocPageComponent,
    AtlasDocSectionComponent,
    AtlasInlineCodeComponent,
    AtlasCodeBlockComponent,
  ],
  templateUrl: './toast-doc.page.html',
  styleUrls: ['./toast-doc.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastDocPage {
  private readonly notifications = inject(AtlasNotificationsService);
  protected readonly setupCode =
    `this.notifications.successKey('sandbox.pages.toast.successMessage', {
  titleKey: 'sandbox.pages.toast.success',
  detailsKey: 'sandbox.pages.toast.successDetails',
  position: 'bottom-center',
  actions: [
    { label: { key: 'ui.common.undo' }, variant: 'primary', onClick: () => ..., closeOnClick: true },
    { label: { key: 'ui.common.details' }, variant: 'ghost', href: '/logs' },
  ],
  durationMs: 6000,
});`;

  protected fireInfo() {
    this.notifications.infoKey('sandbox.pages.toast.infoMessage', {
      titleKey: 'sandbox.pages.toast.info',
      durationMs: 0,
      position: 'bottom-center',
    });
  }

  protected fireSuccess() {
    this.notifications.successKey('sandbox.pages.toast.successMessage', {
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
    this.notifications.warning('Verifique os campos destacados', {
      title: 'Atenção',
      position: 'top-center',
      durationMs: 5000,
    });
  }

  protected fireErrorSticky() {
    this.notifications.error('Falha ao salvar', {
      title: 'Erro',
      details: 'Não foi possível concluir a operação. Tente novamente em alguns instantes.',
      position: 'bottom-center',
      durationMs: 0,
    });
  }

  protected fireNeutral() {
    this.notifications.neutral('Default toast', {
      title: 'Erro',
      details: 'Não foi possível concluir a operação. Tente novamente em alguns instantes.',
      position: 'bottom-center',
      durationMs: 0,
    });
  }

  protected clear() {
    this.notifications.clear();
  }
}
