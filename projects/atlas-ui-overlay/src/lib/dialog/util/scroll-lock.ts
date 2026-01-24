let lockCount = 0;
let previousOverflow = '';
let previousPaddingRight = '';

export function lockBodyScroll(): () => void {
  lockCount++;
  if (lockCount > 1) {
    return () => unlockBodyScroll();
  }

  const body = document.body;
  previousOverflow = body.style.overflow;
  previousPaddingRight = body.style.paddingRight;

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  body.style.overflow = 'hidden';
  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }

  return () => unlockBodyScroll();
}

function unlockBodyScroll(): void {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount !== 0) return;

  const body = document.body;
  body.style.overflow = previousOverflow;
  body.style.paddingRight = previousPaddingRight;
}
