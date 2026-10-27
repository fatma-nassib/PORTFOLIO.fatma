import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { HERO, IMAGES, NAV_ITEMS, PROFILE } from '../data/portfolio.data';
import { Icon } from '../shared/icon';

/**
 * Hero unified design.
 *
 * A portrait-led hero with scroll-driven parallax. The canvas panel sweeps up
 * over the photo as you scroll.
 */
@Component({
  selector: 'app-hero',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="home"
      class="relative"
      [style.--p]="progress()"
      [style.--headline-opacity]="contentOpacity()"
      aria-labelledby="hero-headline"
    >
        <!-- Clear the fixed chrome: the cream top bar on phones; from md the rail sits beside the content. -->
        <div class="relative h-[100svh] overflow-hidden">
          <div class="absolute inset-0 md:inset-y-0 md:left-auto md:right-0 md:w-[68%] [transform:translate3d(0,calc(var(--p)*12svh),0)_scale(calc(1+var(--p)*0.08))]">
            <img
              [src]="images.hero"
              alt=""
              aria-hidden="true"
              class="h-full w-full object-cover object-[center_15%] brightness-90"
              fetchpriority="high"
            />
          </div>

          <!-- Fade the portrait into the canvas so the copy stays legible. -->
          <div
            class="pointer-events-none absolute inset-0 bg-linear-to-b from-canvas/5 via-transparent to-canvas/85 md:bg-linear-to-r md:from-canvas md:via-canvas/80 md:via-45% md:to-transparent md:to-80%"
            aria-hidden="true"
          ></div>

          <div
            class="section-shell relative flex h-full flex-col justify-end pb-10 pt-[calc(4.5rem+2svh)] text-fg md:max-w-[58%] md:justify-center md:pb-10"
            [style.opacity]="contentOpacity()"
            [style.transform]="'translate3d(0,' + -progress() * 6 + 'rem,0)'"
          >
            <p class="eyebrow mb-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-fg/85">
              <span class="rule-accent" aria-hidden="true"></span>
              {{ hero.eyebrow }}
            </p>

            <h1
              id="hero-headline"
              class="screamer mb-4 text-fg [font-size:clamp(30px,min(9vw,7svh),120px)] md:mb-6"
            >
              {{ hero.greeting }}
            </h1>

            <p class="mb-6 text-caption leading-snug text-fg/90 md:text-body md:text-body-lg">
              {{ hero.roles }}
            </p>

            <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div class="max-w-xl">
                <p class="max-w-lg text-caption leading-snug text-fg/90 md:text-body">{{ hero.bio }}</p>
                <div class="mt-5 flex flex-wrap gap-3 md:mt-6">
                  <a href="#about" class="btn btn-cream group/cta px-5 py-3 text-caption md:text-body">
                    See more
                    <app-icon name="arrow-down" sizeClass="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-y-0.5" />
                  </a>
                  <button
                    type="button"
                    class="btn btn-glass px-5 py-3 text-caption md:text-body"
                    (click)="cvRequested.emit()"
                    [attr.aria-disabled]="!hasCv"
                    [title]="hasCv ? 'Download my CV' : 'CV coming soon'"
                  >
                    Download CV
                    <app-icon name="download" sizeClass="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p class="eyebrow flex items-center gap-2.5 text-fg/70 md:pb-2">
                <span class="rule-accent bg-fg/50" aria-hidden="true"></span>
                Scroll
              </p>
            </div>
          </div>
        </div>

        <!-- Spacer drives the parallax; the canvas panel sweeps over the photo. -->
        <div class="pointer-events-none h-[45svh]" aria-hidden="true"></div>

        <div class="canvas-panel relative z-10 bg-canvas">
          <div class="section-shell flex flex-wrap items-end justify-between gap-6 pb-10">
            <nav aria-label="Sections" class="flex flex-wrap gap-x-6 gap-y-2">
              @for (item of navItems; track item.id) {
                <a
                  [href]="'#' + item.id"
                  class="eyebrow border-b border-line/30 pb-0.5 transition hover:border-line-strong"
                >
                  {{ item.label }}
                </a>
              }
            </nav>
            <p class="eyebrow text-fg/70">{{ profile.location }}</p>
          </div>
        </div>
      </section>
  `,
})
export class Hero implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);

  /** Active theme; drives which hero is rendered. */
  readonly theme = input<'light' | 'dark'>('light');

  protected readonly hero = HERO;
  protected readonly images = IMAGES;
  protected readonly navItems = NAV_ITEMS;
  protected readonly profile = PROFILE;
  protected readonly hasCv = PROFILE.cvFile.trim().length > 0;

  /** 0 at the top of the hero; ~0.7 once the next section starts covering it. */
  protected readonly progress = signal(0);
  /** Content clears out well before the panel below has swept fully up. */
  protected readonly contentOpacity = computed(() => Math.max(0, 1 - this.progress() * 3));

  readonly cvRequested = output<void>();

  private frame?: number;

  ngOnInit(): void {
    this.document.defaultView?.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  ngOnDestroy(): void {
    this.document.defaultView?.removeEventListener('scroll', this.onScroll);
    if (this.frame !== undefined) {
      cancelAnimationFrame(this.frame);
    }
  }

  private onScroll = (): void => {
    if (this.frame !== undefined) {
      return;
    }
    this.frame = requestAnimationFrame(() => {
      this.frame = undefined;
      const view = this.document.defaultView;
      if (!view) {
        return;
      }
      const span = view.innerHeight * 0.45;
      this.progress.set(Math.min(1, Math.max(0, view.scrollY / span)));
    });
  };
}
