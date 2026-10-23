import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { ABOUT_TEXT, STATS, type Stat } from '../data/portfolio.data';
import { SectionHeading } from '../shared/section-heading';

@Component({
  selector: 'app-about',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="about"
      class="mx-auto flex max-w-6xl scroll-mt-24 flex-col gap-10 px-6 py-20 md:flex-row md:items-center lg:px-10"
    >
      <div class="md:w-3/5">
        <app-section-heading text="About Me" />
        <p class="text-zinc-400 md:text-lg">{{ about }}</p>
      </div>

      <div class="grid grid-cols-2 gap-4 md:w-2/5">
        @for (stat of stats; track stat.label) {
          <button
            type="button"
            (click)="statClicked.emit(stat)"
            class="rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur transition hover:-translate-y-1.5 hover:border-neon/60 hover:bg-white/10"
          >
            <h3 class="text-2xl font-bold text-neon sm:text-3xl">{{ stat.value }}</h3>
            <p class="mt-1 text-[11px] uppercase tracking-[0.2em] text-zinc-400">
              {{ stat.label }}
            </p>
          </button>
        }
      </div>
    </section>
  `,
})
export class About {
  protected readonly about = ABOUT_TEXT;
  protected readonly stats = STATS;
  readonly statClicked = output<Stat>();
}
