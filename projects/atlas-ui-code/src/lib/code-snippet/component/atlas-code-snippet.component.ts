import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

@Component({
  selector: 'atlas-code-snippet',
  standalone: true,
  templateUrl: './atlas-code-snippet.component.html',
  styleUrls: ['./atlas-code-snippet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasCodeSnippetComponent {
  @Input() public label?: string;
  @Input() public copyable = true;
  @Input({ required: true }) public text = '';
  @Input() public variant: 'inline' | 'block' = 'block';

  protected copied = signal(false);

  protected async copy() {
    if (!this.copyable || !this.text) return;

    await navigator.clipboard.writeText(this.text);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1000);
  }
}
