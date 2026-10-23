import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

import { NAV_ITEMS, type Stat } from './data/portfolio.data';
import { Icon } from './shared/icon';
import { About } from './sections/about';
import { Certifications } from './sections/certifications';
import { Contact } from './sections/contact';
import { Hero } from './sections/hero';
import { Interests } from './sections/interests';
import { Projects } from './sections/projects';
import { Skills } from './sections/skills';

@Component({
  selector: 'app-root',
  imports: [
    Icon,
    Hero,
    About,
    Interests,
    Skills,
    Certifications,
    Projects,
    Contact,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Preloader -->
    <div
      class="fixed inset-0 z-[1000] grid place-items-center bg-ink transition-opacity duration-500"
      [class.pointer-events-none]="loaded()"
      [class.opacity-0]="loaded()"
      aria-hidden="true"
    >
      <div
        class="h-16 w-16 animate-[spin-slow_1s_linear_infinite] rounded-full border-[6px] border-zinc-300 border-t-neon"
      ></div>
    </div>

    <!-- Sidebar navigation -->
    <header
      class="fixed inset-x-3 top-3 z-50 rounded-2xl border border-white/10 bg-black/50 px-3 py-2 shadow-[0_0_20px_rgba(0,255,255,0.2)] backdrop-blur-md md:inset-x-auto md:left-5 md:top-1/2 md:-translate-y-1/2 md:rounded-3xl md:px-3 md:py-5"
    >
      <nav class="flex items-center justify-between gap-2 md:flex-col md:items-center">
        <a
          href="#home"
          aria-label="Fatma — back to top"
          (click)="scrollTo('home', $event)"
          class="hidden h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-neon bg-slate-deep text-sm font-bold text-white transition hover:scale-110 md:mb-4 md:grid"
        >
          FN
        </a>

        <!-- Desktop links -->
        <ul class="hidden gap-1 md:flex md:flex-col md:items-center">
          @for (item of navItems; track item.id) {
            <li>
              <a
                [href]="'#' + item.id"
                (click)="scrollTo(item.id, $event)"
                [class]="
                  'relative block px-2 py-2 text-[11px] uppercase tracking-wide transition hover:translate-x-1 hover:text-neon ' +
                  (activeSection() === item.id ? 'text-neon' : 'text-zinc-300')
                "
              >
                {{ item.label }}
                @if (activeSection() === item.id) {
                  <span
                    class="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-neon"
                  ></span>
                }
              </a>
            </li>
          }
        </ul>

        <!-- Mobile -->
        <a href="#home" (click)="scrollTo('home', $event)" class="text-xs font-bold text-neon md:hidden">
          Fatma
        </a>
        <button
          type="button"
          class="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-zinc-200 md:hidden"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
          (click)="menuOpen.set(!menuOpen())"
        >
          <app-icon [name]="menuOpen() ? 'close' : 'menu'" />
        </button>
      </nav>

      @if (menuOpen()) {
        <ul id="mobile-menu" class="mt-2 grid grid-cols-2 gap-1 border-t border-white/10 pt-2 md:hidden">
          @for (item of navItems; track item.id) {
            <li>
              <a
                [href]="'#' + item.id"
                (click)="scrollTo(item.id, $event)"
                class="block rounded-lg px-3 py-2 text-xs uppercase tracking-wide transition hover:bg-white/5"
                [class.text-neon]="activeSection() === item.id"
                [class.text-zinc-300]="activeSection() !== item.id"
              >
                {{ item.label }}
              </a>
            </li>
          }
        </ul>
      }
    </header>

    <main class="md:pl-28">
      <app-hero (cvRequested)="onCvRequested()" (profileClicked)="notify('Profile image clicked!')" />
      <app-about (statClicked)="onStatClicked($event)" />
      <app-skills (skillClicked)="notify('Skill: ' + $event.name + ' — ' + $event.level + '%')" />
      <app-certifications (certificateOpened)="onCertificateOpened($event.name)" />
      <app-projects />
      <app-interests (interestClicked)="notify('Interest clicked: ' + $event)" />
      <app-contact />

      <footer class="border-t border-white/10 py-8 text-center text-xs text-zinc-500">
        © {{ year }} Fatma Nassib · Built with Angular, TypeScript &amp; Tailwind CSS
      </footer>
    </main>

    <!-- Toast -->
    <div class="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      @if (toast()) {
        <div
          class="rounded-full border border-neon/50 bg-ink/90 px-5 py-2.5 text-sm text-zinc-100 shadow-[0_0_25px_rgba(0,247,255,0.25)] backdrop-blur"
          role="status"
        >
          {{ toast() }}
        </div>
      }
    </div>
  `,
})
export class App implements OnInit, OnDestroy {
  protected readonly navItems = NAV_ITEMS;
  protected readonly year = new Date().getFullYear();
  protected readonly loaded = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly activeSection = signal('home');
  protected readonly toast = signal('');

  private toastTimer?: ReturnType<typeof setTimeout>;
  private scrollHandler?: () => void;

  ngOnInit(): void {
    setTimeout(() => this.loaded.set(true), 500);

    this.scrollHandler = () => this.updateActiveSection();
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    this.updateActiveSection();
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
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
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  protected notify(message: string): void {
    this.toast.set(message);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(''), 2600);
  }

  protected onCvRequested(): void {
    this.notify('CV download will be available soon.');
  }

  protected onStatClicked(stat: Stat): void {
    this.notify(`${stat.value} ${stat.label}`);
  }

  protected onCertificateOpened(name: string): void {
    this.notify(`Opening certificate: ${name}`);
  }

  private updateActiveSection(): void {
    for (const section of Array.from(document.querySelectorAll<HTMLElement>('section[id]'))) {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        this.activeSection.set(section.id);
      }
    }
  }
}
