import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AtlasCodeBlockComponent, AtlasInlineCodeComponent } from 'atlas-ui-code';
import { AtlasBreadcrumbItem, AtlasDocPageComponent, AtlasDocSectionComponent } from 'atlas-ui-layout';
import { AtlasNotificationsService } from 'atlas-ui-notifications';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';
import { AtlasButtonDirective } from 'atlas-ui-button';

@Component({
  selector: 'sandbox-toast-doc-page',
  standalone: true,
  imports: [
    AtlasTranslationPipe,
    AtlasDocPageComponent,
    AtlasDocSectionComponent,
    AtlasInlineCodeComponent,
    AtlasCodeBlockComponent,
    AtlasButtonDirective
  ],
  templateUrl: './toast-doc.page.html',
  styleUrls: ['./toast-doc.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastDocPage {
  private readonly notificationService = inject(AtlasNotificationsService);
  protected readonly breadcrumbs: AtlasBreadcrumbItem[] = [
    { labelKey: 'sandbox.nav.components', path: '/components' },
    { labelKey: 'sandbox.nav.notifications', path: '/components/notifications' },
    { labelKey: 'sandbox.pages.toast.title' },
  ];
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
        { label: { key: 'ui.common.undo' }, variant: 'success', onClick: () => console.log('undo'), closeOnClick: true },
        { label: { key: 'ui.common.details' }, variant: 'surface', href: '/logs' },
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
      durationMs: 0,
    });
  }

  protected fireNeutral() {
    this.notificationService.neutral('Default toast', {
      title: 'Erro',
      details: 'Não foi possível concluir a operação. Tente novamente em alguns instantes.',
      position: 'bottom-center',
      durationMs: 0,
    });
  }

  protected clear() {
    this.notificationService.clear();
  }
}
