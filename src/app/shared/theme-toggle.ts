import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { Icon } from './icon';
import { ThemeService } from './theme.service';

/**
 * Icon-only theme switch. `styled` selects the chrome it sits in: the fixed
 * cream top bar (`true`) or the dark sidebar (`false`, where the original
 * glass styling is kept).
 */
@Component({
  selector: 'app-theme-toggle',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      (click)="themes.toggle()"
      [attr.aria-label]="themes.isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
      [attr.title]="themes.isDark() ? 'Light mode' : 'Dark mode'"
      [attr.aria-pressed]="themes.isDark()"
      [class]="
        styled()
          ? 'grid h-11 w-11 place-items-center rounded-[20px] border border-current transition hover:opacity-70'
          : 'grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-zinc-200 transition hover:border-neon hover:text-neon'
      "
    >
      <app-icon [name]="themes.isDark() ? 'sun' : 'moon'" sizeClass="h-5 w-5" />
    </button>
  `,
})
export class ThemeToggle {
  protected readonly themes = inject(ThemeService);
  readonly styled = input(true);
}
