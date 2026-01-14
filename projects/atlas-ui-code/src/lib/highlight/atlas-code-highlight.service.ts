import { Injectable } from '@angular/core';

type ThemeName = 'github-light' | 'github-dark';
@Injectable({ providedIn: 'root' })
export class AtlasCodeHighlightService {
  private highlighterPromise?: Promise<any>;
  private readonly supportedThemes: { light: ThemeName; dark: ThemeName } = {
    light: 'github-light',
    dark: 'github-dark',
  };

  private async getHighlighter() {
    this.highlighterPromise ??= (async () => {
      const shiki = await import('shiki');
      return shiki.createHighlighter({
        themes: [this.supportedThemes.light, this.supportedThemes.dark],
        langs: [
          'ts', 'tsx', 'js', 'jsx',
          'html', 'css', 'scss',
          'json', 'bash', 'shell', 'yaml', 'md'
        ]
      });
    })();
    return this.highlighterPromise;
  }

  async highlight(code: string, lang: string, mode: 'light' | 'dark'): Promise<string> {
    const highlighter = await this.getHighlighter();
    const theme = mode === 'dark' ? this.supportedThemes.dark : this.supportedThemes.light;

    const resolvedLang = highlighter.getLoadedLanguages?.().includes(lang) ? lang : 'text';
    return highlighter.codeToHtml(code, {lang: resolvedLang, theme});
  }
}
