import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SKILL_GROUPS } from '../data/portfolio.data';
import { SectionHeading } from '../shared/section-heading';

@Component({
  selector: 'app-skills',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 lg:px-10">
      <app-section-heading text="Skills" subtitle="Technologies and tools I work with." />
      <div class="grid gap-6 md:grid-cols-2">
        @for (group of groups; track group.title) {
          <article
            class="rounded-2xl border border-line bg-surface p-6 backdrop-blur transition hover:border-accent/40"
          >
            <h3 class="mb-2 text-lg font-semibold text-accent">{{ group.title }}</h3>
            <p class="mb-5 text-xs uppercase tracking-[0.18em] text-muted-soft">{{ group.summary }}</p>
            <ul class="flex flex-wrap gap-2">
              @for (skill of group.skills; track skill.name) {
                <li class="rounded-full border border-line px-3 py-1 text-xs text-fg/80">
                  {{ skill.name }}
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
}
