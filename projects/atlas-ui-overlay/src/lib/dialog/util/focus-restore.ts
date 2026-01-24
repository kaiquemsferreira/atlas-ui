export function captureFocusRestore(): () => void {
  const prev = document.activeElement as HTMLElement | null;
  return () => {
    try { prev?.focus?.({ preventScroll: true } as any); } catch {}
  };
}
