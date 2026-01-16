import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone,
  signal, viewChild, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Placement } from './model/placement.type';
import { Align } from './model/align.type';
import { auditTime } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';

@Component({
  selector: 'atlas-tooltip',
  standalone: true,
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasTooltipComponent implements AfterViewInit {
  protected readonly open = signal(false);
  protected readonly topPx = signal<number>(0);
  protected readonly leftPx = signal<number>(0);
  protected readonly align = signal<Align>('center');
  protected readonly placement = signal<Placement>('bottom');
  private readonly panelEl = viewChild<ElementRef<HTMLElement>>('panel');
  private readonly triggerEl = viewChild.required<ElementRef<HTMLElement>>('trigger');

  constructor(private readonly zone: NgZone, private readonly destroyRef: DestroyRef)  {}

  ngAfterViewInit(): void {
    const host = (this.triggerEl().nativeElement).closest('.atlas-tooltip') ?? this.triggerEl().nativeElement;

    host.addEventListener('mouseenter', () => this.show());
    host.addEventListener('mouseleave', () => this.hide());
    host.addEventListener('focusin', () => this.show());
    host.addEventListener('focusout', () => this.hide());

    this.zone.runOutsideAngular(() => {
      merge(
        fromEvent(globalThis, 'resize'),
        fromEvent(globalThis, 'scroll', { capture: true }),
      )
        .pipe(auditTime(16), takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          if (this.open()) this.reposition();
        });
    });
  }

  protected show(): void {
    this.zone.run(() => this.open.set(true));

    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => this.reposition());
      });
    });
  }

  protected hide(): void {
    this.zone.run(() => this.open.set(false));
  }

  protected reposition(): void {
    const trigger = this.triggerEl().nativeElement;
    const panel = this.panelEl()?.nativeElement;

    if (!panel) {
      if (this.open()) {
        this.zone.runOutsideAngular(() => requestAnimationFrame(() => this.reposition()));
      }
      return;
    }

    const t = trigger.getBoundingClientRect();

    panel.style.visibility = 'hidden';

    const p = panel.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const gap = 8;
    const arrowGap = 8;

    const spaceBottom = vh - t.bottom;
    const spaceTop = t.top;

    const canPlaceBottom = spaceBottom >= p.height + gap + arrowGap;
    const canPlaceTop = spaceTop >= p.height + gap + arrowGap;

    let place: Placement;

    if (canPlaceBottom) {
      place = 'bottom';
    } else if (canPlaceTop) {
      place = 'top';
    } else {
      place = 'bottom';
    }

    const top = place === 'bottom'
      ? t.bottom + gap
      : t.top - p.height - gap;

    const centerX = t.left + t.width / 2;
    let left = centerX - p.width / 2;
    let a: Align = 'center';

    const minLeft = 8;
    const maxLeft = vw - p.width - 8;

    if (left < minLeft) { left = minLeft; a = 'start'; }
    else if (left > maxLeft) { left = maxLeft; a = 'end'; }

    this.zone.run(() => {
      this.placement.set(place);
      this.align.set(a);
      this.leftPx.set(left);
      this.topPx.set(top);
    });

    panel.style.visibility = '';
  }
}
