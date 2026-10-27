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
import { Magnetic } from '../shared/magnetic.directive';

/**
 * Hero unified design.
 *
 * A portrait-led hero with scroll-driven parallax. The canvas panel sweeps up
 * over the photo as you scroll.
 */
@Component({
  selector: 'app-hero',
  imports: [Icon, Magnetic],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="home"
      class="relative"
      [style.--p]="progress()"
      [style.--headline-opacity]="contentOpacity()"
      aria-labelledby="hero-headline"
    >
        <!--
          Sticky stage. The section is taller than one screen (100svh + --pin), so
          the photograph and copy stay fixed for an extra --pin of scroll while
          the panel below sweeps up over them. This is what makes the exit
          read as a deliberate transition rather than the page scrolling past.
        -->
        <div class="sticky top-0 h-[100svh] overflow-hidden">
          <!--
            Parallax, now on the pinned stage so it actually plays.
            Mobile: the photo spans the copy width, so a large scale left the
            portrait sliding under the headline. Zoom stays small (2%) and the
            drift is upward only, away from where the text sits.
            Desktop: the photo is offset right of the copy, so it can travel far
            more. The drift is DOWNWARD and the scale is modest, because the panel
            rises from the bottom: pulling the image down while zooming in keeps
            the face in the open band above the panel's edge. A larger scale
            pushed the chin down into the panel and sliced the face.
          -->
          <div class="absolute inset-0 md:inset-y-0 md:left-auto md:right-0 md:w-[68%] [transform:scale(calc(1+var(--p)*0.02))] md:[transform:translate3d(0,calc(var(--p)*4svh),0)_scale(calc(1+var(--p)*0.06))]">
            <img
              [src]="images.hero"
              alt=""
              aria-hidden="true"
              class="settle-in h-full w-full object-cover object-[center_15%] md:object-[center_28%] brightness-90"
              fetchpriority="high"
            />
          </div>

          <!--
            Fade the portrait into the canvas so the copy stays legible. This is
            a directional wash (transparent over the face, opaque toward the copy
            edge) and it does NOT respond to scroll — stacking a scroll-driven
            veil on top of it bleached the photo to a ghost.
          -->
          <div
            class="pointer-events-none absolute inset-0 bg-linear-to-b from-canvas/5 via-transparent to-canvas/85 md:bg-linear-to-r md:from-canvas md:via-canvas/80 md:via-45% md:to-transparent md:to-80%"
            aria-hidden="true"
          ></div>

          <div
            class="section-shell relative flex h-full flex-col justify-end pb-10 pt-[calc(4.5rem+2svh)] text-fg md:max-w-[58%] md:justify-center md:pb-10"
            [style.opacity]="contentOpacity()"
            [style.transform]="'translate3d(0,' + -progress() * 9 + 'rem,0)'"
            [style.filter]="blurPx()"
          >
            <!--
              Entrance choreography: eyebrow, headline, role line, bio, actions
              and the scroll hint arrive in sequence (see rise-in). The delays
              are staggered so the eye travels down the copy.
            -->
            <p
              class="eyebrow rise-in mb-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-fg/85"
              style="--enter-delay: 120ms"
            >
              <span class="rule-accent" aria-hidden="true"></span>
              {{ hero.eyebrow }}
            </p>

            <h1
              id="hero-headline"
              class="screamer rise-in mb-4 text-fg [font-size:clamp(30px,min(9vw,7svh),120px)] md:mb-6"
              style="--enter-delay: 240ms"
            >
              {{ hero.greeting }}
            </h1>

            <p
              class="rise-in mb-6 text-caption leading-snug text-fg/90 md:text-body md:text-body-lg"
              style="--enter-delay: 380ms"
            >
              {{ hero.roles }}
            </p>

            <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div class="max-w-xl">
                <p
                  class="rise-in max-w-lg text-caption leading-snug text-fg/90 md:text-body"
                  style="--enter-delay: 500ms"
                >
                  {{ hero.bio }}
                </p>
                <div class="rise-in mt-5 flex flex-wrap gap-3 md:mt-6" style="--enter-delay: 620ms">
                  <a
                    href="#about"
                    appMagnetic
                    [magneticStrength]="5"
                    class="btn btn-cream group/cta px-5 py-3 text-caption md:text-body"
                  >
                    See more
                    <app-icon name="arrow-down" sizeClass="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-y-0.5" />
                  </a>
                  <button
                    type="button"
                    appMagnetic
                    [magneticStrength]="4"
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

              <p
                class="eyebrow rise-in flex items-center gap-2.5 text-fg/70 md:pb-2"
                style="--enter-delay: 760ms"
              >
                <span class="rule-accent bg-fg/50" aria-hidden="true"></span>
                Scroll
              </p>
            </div>
          </div>
        </div>

        <!--
          The pin runway: empty space after the sticky stage, which is what keeps
          the hero on screen for 55svh of scroll.
        -->
        <div class="pointer-events-none h-[55svh]" aria-hidden="true"></div>

        <!--
          The panel rises inside the pinned stage: it starts a screen below the
          fold and rides up to the bottom edge as progress goes 0 -> 1, covering
          the photograph. It has to live inside the sticky element — as a
          sibling it could never overlap the pinned photo, which is why an
          earlier version sat off-screen for the whole handover.
        -->
        <div
          class="canvas-panel pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-canvas"
          [style.transform]="panelTransform()"
        >
          <!--
            The panel's body. A hairline at the top edge is what makes it read as
            a surface sweeping over the photo rather than a card floating on it.
          -->
          <div class="section-shell flex flex-col gap-5 border-t border-line-strong pb-10 pt-7 md:!pl-32">
            <p class="eyebrow flex items-center gap-2.5 text-muted">
              <span class="relative inline-block h-1.5 w-1.5 rounded-full bg-accent pulse-dot" aria-hidden="true"></span>
              {{ hero.eyebrow }}
            </p>

            <p class="screamer size-heading-sm max-w-[26ch] text-fg">
              {{ hero.roles }}
            </p>
          </div>

          <!-- Location lives here only; repeating it in the row above was duplication. -->
          <div class="section-shell flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pb-8 pt-4 md:!pl-32">
            <p class="eyebrow text-muted-soft">{{ profile.location }}</p>
            <a
              href="#about"
              class="pointer-events-auto eyebrow group inline-flex items-center gap-2 text-fg transition-colors hover:text-accent"
            >
              Continue to the work
              <app-icon name="arrow-down" sizeClass="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
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

  /** 0 at the top of the hero; 1 when the pinned stage has fully handed over. */
  protected readonly progress = signal(0);

  /**
   * The copy holds at full strength for the first half of the pinned scroll and
   * only then begins to leave.
   *
   * The fade has to finish BEFORE the panel arrives, or the two fight: the text
   * dies while the panel is still empty, and you are left staring at a dim hero
   * with a stray hairline at the bottom (exactly what scroll ~280 used to show).
   * Windows below: copy leaves over 0.50–0.88, panel arrives over 0.45–1.0.
   */
  protected readonly contentOpacity = computed(() => {
    const p = this.progress();
    return Math.max(0, 1 - Math.max(0, p - 0.5) / 0.32);
  });

  /** Copy defocuses as it leaves, so the handover feels like depth, not a cut. */
  protected readonly blurPx = computed(() => {
    const leaving = Math.max(0, this.progress() - 0.5) / 0.5;
    return `blur(${(Math.min(1, leaving) * 5).toFixed(2)}px)`;
  });

  /**
   * The panel's travel, in % of its own height.
   *
   * Delayed so the panel starts rising only once the copy has begun to clear,
   * then eased out (fast off the mark, gentle landing) so it reads as a surface
   * being laid down over the photo rather than a late cut.
   */
  protected readonly panelTransform = computed(() => {
    const p = this.progress();
    const local = Math.min(1, Math.max(0, (p - 0.45) / 0.55));
    const travelled = 1 - Math.pow(1 - local, 2.2);
    return `translate3d(0, ${((1 - travelled) * 130).toFixed(2)}%, 0)`;
  });

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
      // Scroll distance over which the stage stays pinned, in px. Must match
      // `--pin` on the sticky element (55svh) for the handover to line up.
      const span = Math.max(1, view.innerHeight * 0.55);
      this.progress.set(Math.min(1, Math.max(0, view.scrollY / span)));
    });
  };
}
