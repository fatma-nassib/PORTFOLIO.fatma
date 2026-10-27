import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SKILL_GROUPS } from '../data/portfolio.data';
import { SectionHeading } from '../shared/section-heading';

@Component({
  selector: 'app-skills',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="page-section scroll-mt-24">
      <app-section-heading text="Skills" index="02" subtitle="Technologies and tools I work with." />
      <div class="grid gap-5 md:grid-cols-2">
        @for (group of groups; track group.title) {
          <article class="card-outline group flex flex-col gap-4 p-6">
            <div class="flex items-start justify-between gap-4">
              <div class="flex flex-col gap-1.5">
                <h3 class="text-lg font-semibold text-fg transition-colors group-hover:text-accent">{{ group.title }}</h3>
                <p class="text-[11px] uppercase tracking-[0.18em] text-muted-soft">{{ group.summary }}</p>
              </div>
              <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" aria-hidden="true"></span>
            </div>
            <ul class="flex flex-wrap gap-2">
              @for (skill of group.skills; track skill.name) {
                <li class="tag text-muted transition-colors group-hover:border-accent/40 group-hover:text-fg/90">
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
