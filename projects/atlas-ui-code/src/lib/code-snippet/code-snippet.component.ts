import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

@Component({
  selector: 'atlas-code-snippet',
  standalone: true,
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasCodeSnippetComponent {
  @Input() label?: string;
  @Input() copyable = true;
  @Input({ required: true }) text = '';
  @Input() variant: 'inline' | 'block' = 'block';

  protected copied = signal(false);

  protected async copy() {
    if (!this.copyable || !this.text) return;

    await navigator.clipboard.writeText(this.text);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1000);
  }
}
