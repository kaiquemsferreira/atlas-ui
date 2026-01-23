import { ElementRef } from '@angular/core';

import { AtlasOverlayPosition } from '../model/atlas-overlay.types';

export function resolveOrigin(origin: HTMLElement | ElementRef<HTMLElement>): HTMLElement {
  return origin instanceof ElementRef ? origin.nativeElement : origin;
}

export function applyPosition(panel: HTMLElement, position: AtlasOverlayPosition): void {
  if (position.type === 'center') {
    panel.style.left = '50%';
    panel.style.top = '50%';
    panel.style.transform = 'translate(-50%, -50%)';
    return;
  }

  const originEl = resolveOrigin(position.origin);
  const t = originEl.getBoundingClientRect();
  const p = panel.getBoundingClientRect();

  const gap = position.offsetPx ?? 8;
  const placement = position.placement ?? 'bottom';
  const align = position.align ?? 'center';

  let top = 0;
  let left = 0;

  if (placement === 'bottom') top = t.bottom + gap;
  if (placement === 'top') top = t.top - p.height - gap;
  if (placement === 'right') left = t.right + gap;
  if (placement === 'left') left = t.left - p.width - gap;

  if (placement === 'top' || placement === 'bottom') {
    if (align === 'start') left = t.left;
    if (align === 'center') left = t.left + t.width / 2 - p.width / 2;
    if (align === 'end') left = t.right - p.width;
  } else {
    if (align === 'start') top = t.top;
    if (align === 'center') top = t.top + t.height / 2 - p.height / 2;
    if (align === 'end') top = t.bottom - p.height;
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const margin = 8;

  left = Math.max(margin, Math.min(left, vw - p.width - margin));
  top = Math.max(margin, Math.min(top, vh - p.height - margin));

  panel.style.transform = '';
  panel.style.left = `${left}px`;
  panel.style.top = `${top}px`;
}
