import { AtlasOverlayAlign, AtlasOverlayConnectedPosition, AtlasOverlayPlacement,
  AtlasOverlayPosition } from '../model/atlas-overlay.types';

export function applyPosition(panelEl: HTMLElement, position: AtlasOverlayPosition): void {
  if (position.type === 'center') {
    applyCenter(panelEl);
    return;
  }
  applyConnected(panelEl, position);
}

function applyCenter(panelEl: HTMLElement): void {
  panelEl.style.position = 'fixed';
  panelEl.style.left = '50%';
  panelEl.style.top = '50%';
  panelEl.style.transform = 'translate(-50%, -50%)';
}

function applyConnected(panelEl: HTMLElement, pos: AtlasOverlayConnectedPosition): void {
  const origin = pos.origin;
  const placement: AtlasOverlayPlacement = pos.placement ?? 'bottom';
  const align: AtlasOverlayAlign = pos.align ?? 'start';
  const gap = pos.offsetPx ?? 8;
  const flip = pos.flip ?? true;
  const pad = pos.viewportPaddingPx ?? 8;

  panelEl.style.position = 'fixed';
  panelEl.style.transform = 'translate(0, 0)';

  const o = origin.getBoundingClientRect();

  if (pos.matchWidth) {
    panelEl.style.width = `${o.width}px`;
  } else {
    panelEl.style.width = '';
  }

  const prevVis = panelEl.style.visibility;
  panelEl.style.visibility = 'hidden';
  const p = panelEl.getBoundingClientRect();
  panelEl.style.visibility = prevVis;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const fits = (pl: AtlasOverlayPlacement) => {
    if (pl === 'bottom') return (vh - o.bottom) >= (p.height + gap + pad);
    if (pl === 'top') return o.top >= (p.height + gap + pad);
    if (pl === 'right') return (vw - o.right) >= (p.width + gap + pad);
    if (pl === 'left') return o.left >= (p.width + gap + pad);
    return true;
  };

  const opposite = (pl: AtlasOverlayPlacement): AtlasOverlayPlacement => {
    if (pl === 'bottom') return 'top';
    if (pl === 'top') return 'bottom';
    if (pl === 'left') return 'right';
    return 'left';
  };

  const finalPlacement =
    flip && !fits(placement) && fits(opposite(placement))
      ? opposite(placement)
      : placement;

  let top: number;
  let left: number;

  if (finalPlacement === 'bottom' || finalPlacement === 'top') {
    top = finalPlacement === 'bottom' ? (o.bottom + gap) : (o.top - p.height - gap);

    if (align === 'start') left = o.left;
    else if (align === 'end') left = o.right - p.width;
    else left = o.left + (o.width / 2) - (p.width / 2);

    left = clamp(left, pad, vw - p.width - pad);
    top = clamp(top, pad, vh - p.height - pad);
  } else {
    left = finalPlacement === 'right' ? (o.right + gap) : (o.left - p.width - gap);

    if (align === 'start') top = o.top;
    else if (align === 'end') top = o.bottom - p.height;
    else top = o.top + (o.height / 2) - (p.height / 2);

    left = clamp(left, pad, vw - p.width - pad);
    top = clamp(top, pad, vh - p.height - pad);
  }

  panelEl.style.left = `${left}px`;
  panelEl.style.top = `${top}px`;
  panelEl.setAttribute('data-placement', finalPlacement);
  panelEl.setAttribute('data-align', align);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
