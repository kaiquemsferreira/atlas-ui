import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, Type, Injector } from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';

import { AtlasAlign, AtlasDialogAction, AtlasDialogSize } from '../model/atlas-dialog.types';
import { AtlasDialogRef } from '../service/atlas-dialog-ref';
import { AtlasButtonDirective } from 'atlas-ui-button';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-dialog-container',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgComponentOutlet,
    AtlasButtonDirective,
    AtlasTranslationPipe
  ],
  templateUrl: './atlas-dialog-container.component.html',
  styleUrls: ['./atlas-dialog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasDialogContainerComponent<TResult = unknown> {
  @Input() title?: string;
  @Input() titleKey?: string;
  @Input() ariaLabel?: string;
  @Input() component?: Type<unknown>;
  @Input() closeButton = true;
  @Input() componentInjector?: Injector;
  @Input() size: AtlasDialogSize = 'xl';
  @Input() titleTpl?: TemplateRef<unknown>;
  @Input() footerTpl?: TemplateRef<unknown>;
  @Input() contentTpl?: TemplateRef<unknown>;
  @Input() footerAlign: AtlasAlign = 'space-between';
  @Input() headerAlign: AtlasAlign = 'space-between';
  @Input() footerActions?: AtlasDialogAction<TResult>[];

  @Output() readonly requestClose = new EventEmitter<void>();

  readonly titleId = `atlas-dialog-title-${Math.random().toString(16).slice(2)}`;

  constructor(private readonly dialogRef: AtlasDialogRef<TResult>) {}

  public close = (v?: TResult) => this.dialogRef.close(v);

  public async onActionClick(a: AtlasDialogAction<TResult>): Promise<void> {
    if (a.disabled) return;

    if (a.onClick) {
      await a.onClick({ action: a, close: this.close });
    }

    const shouldClose = a.closeOnClick ?? true;
    if (shouldClose) {
      this.dialogRef.close(a.closeValue);
    }
  }

  public actionClass(a: AtlasDialogAction<TResult>): string {
    const extra = a.class ? Array.isArray(a.class) ? a.class : [a.class] : [];
    return ['atlas-dialog__action', ...extra].join(' ');
  }
}
