import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, signal } from '@angular/core';

@Component({
  selector: 'atlas-password-toggle',
  standalone: true,
  templateUrl: './password-toggle.component.html',
  styleUrls: ['./password-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasPasswordToggleComponent implements AfterViewInit {
  @Input() public ariaLabelShow = 'Mostrar senha';
  @Input() public ariaLabelHide = 'Ocultar senha';
  @HostBinding('attr.atlasSuffix') public readonly atlasSuffix = '';

  protected readonly visible = signal(false);
  private input?: HTMLInputElement;

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const field = this.host.nativeElement.closest('atlas-form-field, .atlas-field');
    const el = field?.querySelector('input[atlas-input]') ?? undefined;

    if (el && el instanceof HTMLInputElement) {
      this.input = el;
      this.syncFromInput();
    }
  }

  protected toggle(): void {
    if (!this.input) return;

    const next = !this.visible();
    this.visible.set(next);
    this.input.type = next ? 'text' : 'password';
  }

  protected syncFromInput(): void {
    if (!this.input) return;
    this.visible.set(this.input.type === 'text');
  }
}
