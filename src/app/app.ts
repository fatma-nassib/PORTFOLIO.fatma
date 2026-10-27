import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';

import { NAV_ITEMS, PROFILE } from './data/portfolio.data';
import { Icon } from './shared/icon';
import { ThemeService } from './shared/theme.service';
import { ThemeToggle } from './shared/theme-toggle';
import { About } from './sections/about';
import { Certifications } from './sections/certifications';
import { Contact } from './sections/contact';
import { Experience } from './sections/experience';
import { Hero } from './sections/hero';
import { Interests } from './sections/interests';
import { Projects } from './sections/projects';
import { Skills } from './sections/skills';

@Component({
  selector: 'app-root',
  imports: [
    Icon,
    ThemeToggle,
    Hero,
    About,
    Experience,
    Interests,
    Skills,
    Certifications,
    Projects,
    Contact,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1100] focus:rounded-[20px] focus:bg-hillside-ink focus:px-5 focus:py-3 focus:text-caption focus:font-medium focus:text-meadow-cream"
    >
      Skip to content
    </a>

    <!-- Top bar: hamburger left, wordmark center, ghost CTA right. Floats on the photo. -->
    <header
      class="fixed inset-x-0 top-0 z-50 text-fg transition-colors duration-300"
      [class.text-fg!]="pastHero()"
      [class.bg-canvas!]="pastHero()"
      [style.display]="showsTopBar() ? null : 'none'"
      (keydown.escape)="menuOpen.set(false)"
    >
      <div class="section-shell flex items-center justify-between gap-4 py-4">
        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded-[20px] border-current transition hover:opacity-70"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="site-menu"
          aria-label="Toggle navigation"
          (click)="menuOpen.set(!menuOpen())"
        >
          <app-icon [name]="menuOpen() ? 'close' : 'menu'" sizeClass="h-5 w-5" />
        </button>

        <a
          href="#home"
          (click)="scrollTo('home', $event)"
          class="screamer text-subheading"
          aria-label="Fatma back to top"
        >
          {{ shortName }}
        </a>

        <div class="flex items-center gap-2">
          <app-theme-toggle />
          <a
            href="#contact"
            (click)="scrollTo('contact', $event)"
            class="btn hidden px-5 py-2.5 text-caption sm:inline-flex"
            [class]="pastHero() ? 'btn-ghost' : 'btn-ghost'"
          >
            Get in touch
          </a>
        </div>
      </div>

      @if (menuOpen()) {
        <div id="site-menu" class="border-t border-current/20 bg-canvas text-fg">
          <nav aria-label="Primary" class="section-shell grid py-3">
            @for (item of navItems; track item.id) {
              <a
                [attr.href]="'#' + item.id"
                (click)="scrollTo(item.id, $event)"
                class="screamer size-heading-sm flex items-baseline justify-between border-b border-line/15 py-2 transition hover:pl-2"
                [class.text-accent]="activeSection() === item.id"
              >
                {{ item.label }}
                <span class="font-grotesk text-caption font-medium normal-case">
                  {{ $index + 1 < 10 ? '0' + ($index + 1) : $index + 1 }}
                </span>
              </a>
            }
          </nav>
        </div>
      }
    </header>

    <!--
      Side navigation panel.
      Dark theme: the original floating glass rail, on every screen size.
      Cream theme: the same rail, restyled as an outlined cream card, so it is
      never lost behind the light canvas. Hidden on phones, where the cream
      top bar above takes over instead.
    -->
    <header
      class="side-rail fixed inset-x-3 top-3 z-50 px-3 py-2 md:inset-x-auto md:left-5 md:top-1/2 md:-translate-y-1/2 md:px-3 md:py-5"
      [style.display]="showsTopBar() ? 'none' : null"
      (keydown.escape)="menuOpen.set(false)"
    >
      <nav class="flex items-center justify-between gap-2 md:flex-col md:items-center" aria-label="Primary">
        <div class="flex items-center gap-2 md:mb-4 md:flex-col">
          <a
            href="#home"
            aria-label="Fatma back to top"
            (click)="scrollTo('home', $event)"
            class="side-avatar grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold md:h-12 md:w-12 md:text-sm"
          >
            {{ initials }}
          </a>
          <app-theme-toggle [styled]="themes.isDark()" />
        </div>

        <!-- Desktop links -->
        <ul class="hidden gap-1 md:flex md:flex-col md:items-center">
          @for (item of navItems; track item.id) {
            <li>
              <a
                [attr.href]="'#' + item.id"
                (click)="scrollTo(item.id, $event)"
                class="side-link"
                [class.is-active]="activeSection() === item.id"
              >
                {{ item.label }}
                @if (activeSection() === item.id) {
                  <span
                    class="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-current"
                    aria-hidden="true"
                  ></span>
                }
              </a>
            </li>
          }
        </ul>

        <!-- Mobile menu -->
        <button
          type="button"
          class="side-menu-button grid h-9 w-9 place-items-center rounded-lg md:hidden"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
          (click)="menuOpen.set(!menuOpen())"
        >
          <app-icon [name]="menuOpen() ? 'close' : 'menu'" />
        </button>
      </nav>

      @if (menuOpen()) {
        <ul id="mobile-menu" class="side-mobile-menu mt-2 grid grid-cols-2 gap-1 pt-2 md:hidden">
          @for (item of navItems; track item.id) {
            <li>
              <a
                [attr.href]="'#' + item.id"
                (click)="scrollTo(item.id, $event)"
                class="side-mobile-link block rounded-lg px-3 py-2 text-xs uppercase tracking-wide transition"
                [class.is-active]="activeSection() === item.id"
              >
                {{ item.label }}
              </a>
            </li>
          }
        </ul>
      }
    </header>

    <main id="main" class="bg-canvas text-fg" [class.md:pl-28]="!showsTopBar()">
      <app-hero [theme]="themes.theme()" (cvRequested)="onCvRequested()" />
      <app-about />
      <app-skills />
      <app-experience />
      <app-projects />
      <app-certifications (certificateOpened)="onCertificateOpened($event.name)" />
      <app-interests (interestClicked)="notify('Interest clicked: ' + $event)" />
      <app-contact />

      <footer class="section-shell border-t border-line py-8 text-center text-xs text-fg/60">
        <p class="screamer size-heading-sm mb-2">{{ shortName }}</p>
        <p>© {{ year }} · Built with Angular, TypeScript &amp; Tailwind CSS</p>
      </footer>
    </main>

    <!-- Toast -->
    <div class="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      @if (toast()) {
        <div
          class="rounded-[20px] border-fg bg-fg px-5 py-2.5 text-body text-canvas"
          role="status"
        >
          {{ toast() }}
        </div>
      }
    </div>
  `,
})
export class App implements OnInit, OnDestroy {
  protected readonly themes = inject(ThemeService);
  protected readonly navItems = NAV_ITEMS;
  protected readonly shortName = PROFILE.shortName;
  protected readonly initials = PROFILE.initials;
  protected readonly year = new Date().getFullYear();
  protected readonly menuOpen = signal(false);
  protected readonly activeSection = signal('home');
  protected readonly toast = signal('');
  protected readonly scrolled = signal(0);
  private readonly viewportWidth = signal(1024);

  /** Cream top bar flips to ink once the cream panel has finished covering the photo. */
  protected readonly pastHero = computed(() => this.scrolled() > 0.86);

  /** Phones use the cream top bar; everything wider uses the side rail. */
  protected readonly showsTopBar = computed(
    () => this.viewportWidth() < 768,
  );

  private toastTimer?: ReturnType<typeof setTimeout>;
  private scrollHandler?: () => void;
  private scrollFrame?: number;
  private resizeHandler?: () => void;

  ngOnInit(): void {
    this.scrollHandler = () => {
      if (this.scrollFrame !== undefined) {
        return;
      }
      this.scrollFrame = requestAnimationFrame(() => {
        this.scrollFrame = undefined;
        this.scrolled.set(window.scrollY / Math.max(1, window.innerHeight));
        this.updateActiveSection();
      });
    };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    this.resizeHandler = () => this.viewportWidth.set(window.innerWidth);
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler, { passive: true });
    this.updateActiveSection();
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    if (this.scrollFrame !== undefined) {
      cancelAnimationFrame(this.scrollFrame);
    }
    clearTimeout(this.toastTimer);
  }

  protected scrollTo(id: string, event: Event): void {
    event.preventDefault();
    this.menuOpen.set(false);
    const target = document.getElementById(id);
    if (!target) {
      return;
    }
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  protected notify(message: string): void {
    this.toast.set(message);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(''), 2600);
  }

  protected onCvRequested(): void {
    const file = PROFILE.cvFile.trim();
    if (!file) {
      this.notify('CV download will be available soon.');
      return;
    }

    const url = this.assetUrl(file);

    // The `download` attribute only works for same-origin URLs. If the CV lives
    // on another origin the browser ignores it and may render the PDF instead,
    // so fall back to opening it in a new tab.
    if (new URL(url, window.location.origin).origin !== window.location.origin) {
      window.open(url, '_blank', 'noopener');
      return;
    }

    const link = document.createElement('a');
    link.href = url;
    link.download = file.split('/').pop() ?? 'Fatma-Nassib-CV.pdf';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  /** Resolves a `public/` asset so it works regardless of the deployment base path. */
  private assetUrl(path: string): string {
    return new URL(path.replace(/^\/+/, ''), document.baseURI).href;
  }

  protected onCertificateOpened(name: string): void {
    this.notify(`Opening certificate: ${name}`);
  }

  private updateActiveSection(): void {
    const marker = window.innerHeight * 0.35;
    let current = this.activeSection();

    for (const section of Array.from(document.querySelectorAll<HTMLElement>('section[id]'))) {
      if (section.getBoundingClientRect().top <= marker) {
        current = section.id;
      }
    }

    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      const last = sections[sections.length - 1];
      if (last) {
        current = last.id;
      }
    }

    if (current !== this.activeSection()) {
      this.activeSection.set(current);
    }
  }
}
