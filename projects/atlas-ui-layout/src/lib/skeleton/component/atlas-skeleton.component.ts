import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { AtlasSkeletonAnimation, AtlasSkeletonRadius, AtlasSkeletonVariant } from '../model/atlas-skeleton.type';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'atlas-skeleton',
  standalone: true,
  templateUrl: './atlas-skeleton.component.html',
  styleUrls: ['./atlas-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgStyle
  ]
})
export class AtlasSkeletonComponent {
  @Input() size?: string;
  @Input() width?: string;
  @Input() height?: string;
  @Input() lines = 1;
  @Input() decorative = true;
  @Input() lastLineWidth = '60%';
  @Input() ariaLabel = 'Loading';
  @Input() variant: AtlasSkeletonVariant = 'rect';
  @Input() radius: AtlasSkeletonRadius = 'inherit';
  @Input() animation: AtlasSkeletonAnimation = 'wave';

  @HostBinding('attr.role') get role(): string | null {
    return this.decorative ? null : 'status';
  }
  @HostBinding('attr.data-variant') get dataVariant() {
    return this.variant;
  }
  @HostBinding('attr.data-animation') get dataAnimation() {
    return this.animation;
  }
  @HostBinding('style.width') get hostWidth(): string | null {
    if (this.variant === 'circle') return this.size ?? this.width ?? null;
    return this.width ?? null;
  }
  @HostBinding('style.height') get hostHeight(): string | null {
    if (this.variant === 'circle') return this.size ?? this.height ?? null;
    if (this.variant === 'text') return null;
    return this.height ?? null;
  }
  @HostBinding('attr.aria-live') get ariaLive(): string | null {
    return this.decorative ? null : 'polite';
  }
  @HostBinding('attr.aria-hidden') get ariaHidden(): 'true' | null {
    return this.decorative ? 'true' : null;
  }
  @HostBinding('attr.aria-label') get ariaLabelAttr(): string | null {
    return this.decorative ? null : this.ariaLabel;
  }


  get resolvedRadius(): string {
    if (this.radius !== 'inherit') return this.radius;

    if (this.variant === 'circle') return 'pill';
    if (this.variant === 'text') return 'pill';
    return 'md';
  }
  get textLineArray(): number[] {
    const n = Math.max(1, Math.floor(this.lines || 1));
    return Array.from({ length: n }, (_, i) => i);
  }

  protected lineStyle(index: number): Record<string, string> {
    const isLast = index === this.textLineArray.length - 1;
    const h = this.height ?? '1.2rem';

    return {
      height: h,
      width: isLast ? this.lastLineWidth : '100%',
    };
  }
}
