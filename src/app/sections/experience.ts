import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EDUCATION, EXPERIENCE, LEADERSHIP } from '../data/portfolio.data';
import { SectionHeading } from '../shared/section-heading';
import { Spotlight } from '../shared/spotlight.directive';
import { Stagger } from '../shared/stagger.directive';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-experience',
  imports: [SectionHeading, Stagger, Spotlight, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="page-section">
      <app-section-heading text="Experience" index="03" subtitle="Roles, education and commitments." />

      <ol appStagger [staggerGap]="90" class="relative ml-3 border-l border-line-soft">
        @for (job of experience; track job.role + job.company) {
          <li class="group relative ml-6 pb-10 last:pb-0">
            <span class="absolute -left-[2.25rem] top-0.5 grid h-5 w-5 place-items-center rounded-full bg-canvas text-accent">
              <app-icon name="briefcase" sizeClass="h-3.5 w-3.5" />
            </span>

            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 class="text-base font-semibold text-fg transition-colors group-hover:text-accent">{{ job.role }}</h3>
              <p class="font-mono text-xs text-muted-soft">{{ job.period }}</p>
            </div>
            <p class="mt-0.5 text-sm text-accent">{{ job.company }}</p>
            <p class="text-xs text-muted-soft">{{ job.location }}</p>

            <ul class="mt-3 flex flex-col gap-1.5 pl-4 text-sm text-muted">
              @for (highlight of job.highlights; track highlight) {
                <li class="relative transition-colors hover:text-accent">
                  <span
                    class="absolute -left-4 top-[0.6em] h-px w-2 bg-line-strong"
                    aria-hidden="true"
                  ></span>
                  {{ highlight }}
                </li>
              }
            </ul>
          </li>
        }
      </ol>

      <div appStagger [staggerGap]="120" class="mt-8 grid gap-5 md:grid-cols-2">
        <div appSpotlight class="card-outline p-6">
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-soft">Education</h3>
          <ul class="flex flex-col gap-5">
            @for (entry of education; track entry.qualification) {
              <li>
                <div class="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h4 class="text-sm font-semibold text-fg">{{ entry.qualification }}</h4>
                  <p class="font-mono text-xs text-muted-soft">{{ entry.period }}</p>
                </div>
                <p class="mt-0.5 text-sm text-muted">{{ entry.institution }}</p>
                @if (entry.detail) {
                  <p class="mt-1 text-xs text-muted-soft">{{ entry.detail }}</p>
                }
              </li>
            }
          </ul>
        </div>

        <div appSpotlight class="card-outline p-6">
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-soft">Leadership</h3>
          <ul class="flex flex-col gap-3 text-sm text-muted">
            @for (item of leadership; track item) {
              <li class="flex gap-2.5">
                <app-icon name="award" sizeClass="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{{ item }}</span>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class Experience {
  protected readonly experience = EXPERIENCE;
  protected readonly education = EDUCATION;
  protected readonly leadership = LEADERSHIP;
}
