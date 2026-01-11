import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AtlasNotificationsService } from 'atlas-ui-notifications';

@Component({
  selector: 'sandbox-toast-doc-page',
  standalone: true,
  templateUrl: './toast-doc.page.html',
  styleUrls: ['./toast-doc.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastDocPage {
  private readonly notificationService = inject(AtlasNotificationsService);

  protected fireInfo() {
    this.notificationService.info('Olá mundo', { title: 'Info', durationMs: 4500, position: 'top-right' });
  }

  protected fireSuccess() {
    this.notificationService.success('Arquivo enviado!', {
      title: 'Upload successful',
      details: 'invoice.pdf foi enviado e indexado. Você pode desfazer dentro de 30s.',
      position: 'bottom-center',
      actions: [
        { label: 'Desfazer', variant: 'primary', onClick: () => console.log('undo'), closeOnClick: true },
        { label: 'Ver detalhes', variant: 'ghost', href: '/logs' },
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
      actions: [
        { label: 'Tentar novamente', variant: 'primary', onClick: () => console.log('retry'), closeOnClick: true },
        { label: 'Fechar', variant: 'secondary', onClick: () => {}, closeOnClick: true },
      ],
    });
  }

  protected clear() {
    this.notificationService.clear();
  }
}
