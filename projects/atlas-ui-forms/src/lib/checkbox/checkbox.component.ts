import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'atlas-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasCheckboxComponent {
  @Input() public ariaLabel?: string;
  @Input() public checked = false;
  @Input() public disabled = false;
  @Input() public indeterminate = false;
  @Output() readonly checkedChange = new EventEmitter<boolean>();

  @HostBinding('attr.role') role = 'checkbox';
  @HostBinding('attr.tabindex') get tabIndex() { return this.disabled ? -1 : 0; }
  @HostBinding('attr.aria-checked')
  get ariaChecked(): 'true' | 'false' | 'mixed' {
    if (this.indeterminate) return 'mixed';
    return this.checked ? 'true' : 'false';
  }
  @HostBinding('attr.aria-disabled') get ariaDisabled() {
    return this.disabled ? 'true' : null;
  }
  @HostBinding('attr.aria-label') get ariaLabelAttr() {
    return this.ariaLabel ?? null;
  }
  @HostBinding('attr.data-checked') get dataChecked() {
    return this.checked ? 'true' : null;
  }
  @HostBinding('attr.data-disabled') get dataDisabled() {
    return this.disabled ? 'true' : null;
  }
  @HostBinding('attr.data-indeterminate') get dataIndeterminate() {
    return this.indeterminate ? 'true' : null;
  }

  private toggle(): void {
    if (this.disabled) return;
    const next = !this.checked;
    this.indeterminate = false;
    this.checkedChange.emit(next);
  }

  @HostListener('click', ['$event'])
  onClick(ev: MouseEvent): void {
    ev.stopPropagation();
    this.toggle();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(ev: KeyboardEvent): void {
    if (this.disabled) return;

    if (ev.key === ' ' || ev.key === 'Enter') {
      ev.preventDefault();
      ev.stopPropagation();
      this.toggle();
    }
  }
}
