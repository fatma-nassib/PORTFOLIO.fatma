import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { SKILL_GROUPS, type Skill } from '../data/portfolio.data';
import { SectionHeading } from '../shared/section-heading';

@Component({
  selector: 'app-skills',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 lg:px-10">
      <app-section-heading text="Skills" subtitle="Click any skill for details." />
      <div class="grid gap-6 md:grid-cols-2">
        @for (group of groups; track group.title) {
          <article
            class="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur transition hover:border-magenta/40"
          >
            <h3 class="mb-2 text-lg font-semibold text-neon">{{ group.title }}</h3>
            <p class="mb-5 text-xs uppercase tracking-[0.18em] text-zinc-500">{{ group.summary }}</p>
            <ul class="flex flex-col gap-3">
              @for (skill of group.skills; track skill.name) {
                <li>
                  <button
                    type="button"
                    (click)="skillClicked.emit(skill)"
                    class="group block w-full rounded-lg py-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon"
                  >
                    <span class="flex items-center justify-between text-sm text-zinc-300">
                      <span class="transition group-hover:text-white">{{ skill.name }}</span>
                      <span class="font-mono text-xs text-zinc-500">{{ skill.level }}%</span>
                    </span>
                    <span class="mt-1.5 block h-2 overflow-hidden rounded-full bg-white/10">
                      <span
                        class="block h-full rounded-full bg-gradient-to-r from-neon to-magenta transition-[width] duration-1000 ease-out"
                        [style.width.%]="skill.level"
                      ></span>
                    </span>
                  </button>
                </li>
              }
            </ul>
          </article>
        }
      </div>
    </section>
  `,
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
  readonly skillClicked = output<Skill>();
}
