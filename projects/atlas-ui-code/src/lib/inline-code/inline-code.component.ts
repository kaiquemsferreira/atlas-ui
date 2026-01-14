import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

@Component({
  selector: 'atlas-inline-code',
  standalone: true,
  templateUrl: './inline-code.component.html',
  styleUrls: ['./inline-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasInlineCodeComponent {
  @Input() text?: string;
  @Input() copyable = false;
  @Input() variant: 'default' | 'subtle' = 'default';

  protected copied = signal(false);
  protected async copy(value: string) {
    if (!this.copyable) return;

    await navigator.clipboard.writeText(value);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1000);
  }
}
