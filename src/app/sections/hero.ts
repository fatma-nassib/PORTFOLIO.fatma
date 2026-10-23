import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { HERO, PROFILE } from '../data/portfolio.data';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-hero',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="home"
      class="relative flex min-h-screen scroll-mt-24 flex-col items-center justify-center gap-12 overflow-hidden px-6 pb-24 pt-28 md:flex-row md:justify-between md:py-24 lg:px-16"
    >
      <!-- Glow accents -->
      <div
        class="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-neon/20 blur-3xl"
        aria-hidden="true"
      ></div>
      <div
        class="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-magenta/20 blur-3xl"
        aria-hidden="true"
      ></div>

      <div class="relative z-10 max-w-2xl text-center md:text-left">
        <p
          class="mb-4 inline-flex items-center gap-2 rounded-full border border-neon/40 bg-neon/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-neon"
        >
          <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-neon"></span>
          Available for opportunities
        </p>
        <h1
          class="text-4xl font-extrabold leading-tight text-white drop-shadow-[0_0_18px_rgba(0,247,255,0.45)] sm:text-5xl lg:text-6xl"
        >
          {{ hero.greeting }}
        </h1>
        <h2 class="mt-4 text-lg font-semibold leading-snug text-gradient sm:text-2xl">
          {{ hero.roles }}
        </h2>
        <p class="mt-5 max-w-xl text-zinc-400 md:text-lg">
          {{ hero.bio }}
        </p>

        <div class="mt-9 flex flex-wrap justify-center gap-4 md:justify-start">
          <a
            href="#about"
            class="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon to-magenta px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neon/20 transition hover:-translate-y-0.5 hover:shadow-neon/40"
          >
            Discover More
            <app-icon name="arrow-down" sizeClass="h-4 w-4 transition group-hover:translate-y-0.5" />
          </a>
          <button
            type="button"
            (click)="cvRequested.emit()"
            [attr.aria-disabled]="!hasCv"
            [title]="hasCv ? 'Download my CV' : 'CV coming soon'"
            class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-magenta hover:text-magenta aria-disabled:cursor-not-allowed aria-disabled:opacity-70 aria-disabled:hover:translate-y-0"
          >
            Download CV
            <app-icon name="download" sizeClass="h-4 w-4" />
          </button>
        </div>
      </div>

      <button
        type="button"
        (click)="profileClicked.emit()"
        aria-label="Profile picture"
        class="group relative z-10 h-56 w-56 shrink-0 rounded-full border-[3px] border-neon bg-slate-deep shadow-[0_0_40px_rgba(0,247,255,0.35)] transition-transform duration-500 hover:rotate-6 hover:scale-105 sm:h-72 sm:w-72"
      >
        <span
          class="absolute inset-4 grid place-items-center rounded-full bg-gradient-to-br from-neon/20 to-magenta/20 text-5xl font-extrabold tracking-tight text-white"
        >
          FN
        </span>
      </button>
    </section>
  `,
})
export class Hero {
  protected readonly hero = HERO;
  protected readonly hasCv = PROFILE.cvFile.trim().length > 0;
  readonly cvRequested = output<void>();
  readonly profileClicked = output<void>();
}
