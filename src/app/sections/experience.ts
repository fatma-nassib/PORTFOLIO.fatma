import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EDUCATION, EXPERIENCE, LEADERSHIP } from '../data/portfolio.data';
import { SectionHeading } from '../shared/section-heading';

@Component({
  selector: 'app-experience',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="mx-auto max-w-6xl px-6 py-20 lg:px-10">
      <app-section-heading text="Experience" subtitle="Roles, education and commitments." />

      <ol class="relative ml-3 border-l border-line">
        @for (job of experience; track job.role + job.company) {
          <li class="relative ml-6 pb-10 last:pb-0">
            <span
              class="absolute -left-[2.05rem] top-1.5 h-3 w-3 rounded-full border-2 border-fg"
              [class]="job.current ? 'bg-accent shadow-[0_0_12px_rgba(0,247,255,0.8)]' : 'bg-muted-soft'"
              aria-hidden="true"
            ></span>

            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 class="text-base font-semibold text-fg">{{ job.role }}</h3>
              <p class="font-mono text-xs text-muted-soft">{{ job.period }}</p>
            </div>
            <p class="mt-0.5 text-sm text-accent">{{ job.company }}</p>
            <p class="text-xs text-muted-soft">{{ job.location }}</p>

            <ul class="mt-3 flex flex-col gap-1.5 pl-4 text-sm text-muted">
              @for (highlight of job.highlights; track highlight) {
                <li>{{ highlight }}</li>
              }
            </ul>
          </li>
        }
      </ol>

      <div class="mt-6 grid gap-6 md:grid-cols-2">
        <div class="card p-6">
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

        <div class="card p-6">
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-soft">Leadership</h3>
          <ul class="flex flex-col gap-3 text-sm text-muted">
            @for (item of leadership; track item) {
              <li class="flex gap-2.5">
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true"></span>
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
