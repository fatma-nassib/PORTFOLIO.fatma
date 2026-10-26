import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'fatma-theme';

/**
 * Owns the active theme.
 *
 * Cream is the default; dark uses the same restrained editorial palette. The choice is
 * persisted and written to `<html data-theme>` (also `<html class="dark">` so
 * the palette variables in styles.css apply), and the browser chrome colour is
 * kept in step with the canvas.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly theme = signal<Theme>(this.initialTheme());
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => this.apply(this.theme()));
  }

  toggle(): void {
    this.theme.update((current) => (current === 'light' ? 'dark' : 'light'));
  }

  private initialTheme(): Theme {
    const stored = this.readStored();
    if (stored) {
      return stored;
    }
    const prefersDark = this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  private readStored(): Theme | null {
    try {
      const value = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  }

  private apply(theme: Theme): void {
    const root = this.document.documentElement;
    root.dataset['theme'] = theme;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;

    const meta = this.document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute('content', theme === 'dark' ? '#0a0f1a' : '#f7f4e8');

    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Private mode with storage disabled, the in-memory choice still works.
    }
  }
}
