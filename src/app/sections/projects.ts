import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

import {
  PROJECT_FILTERS,
  PROJECTS,
  type Project,
  type ProjectCategory,
} from '../data/portfolio.data';
import { Icon } from '../shared/icon';
import { SectionHeading } from '../shared/section-heading';

type ProjectFilter = ProjectCategory | 'all';

@Component({
  selector: 'app-projects',
  imports: [Icon, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projects" class="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 lg:px-10">
      <app-section-heading text="Projects" />

      <div class="mb-8 flex flex-wrap gap-3" role="tablist" aria-label="Project categories">
        @for (filter of filters; track filter.value) {
          <button
            type="button"
            role="tab"
            [attr.aria-selected]="activeFilter() === filter.value"
            (click)="activeFilter.set(filter.value)"
            class="rounded-md border px-4 py-2 text-sm transition"
            [class]="
              activeFilter() === filter.value
                ? 'border-accent bg-accent text-canvas font-semibold'
                : 'border-line text-fg/80 hover:border-accent hover:text-accent'
            "
          >
            {{ filter.label }}
          </button>
        }
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        @for (project of visibleProjects(); track project.title) {
          <article
            class="group relative flex flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/60"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="text-base font-semibold text-fg">{{ project.title }}</h3>
                <p class="mt-1 text-xs text-accent">{{ project.subtitle }}</p>
              </div>
              @if (project.featured) {
                <span class="shrink-0 rounded-full border border-accent/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent">
                  Featured
                </span>
              }
            </div>

            <p class="mt-4 text-sm leading-relaxed text-muted">{{ project.description }}</p>

            <ul class="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
              @for (tech of project.stack; track tech) {
                <li class="rounded-md bg-surface/5 px-2 py-1 font-mono text-[11px] text-muted-soft">
                  {{ tech }}
                </li>
              }
            </ul>

            <div class="mt-auto pt-6">
              @if (project.url) {
                <a
                  [href]="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:underline"
                >
                  {{ project.linkLabel }}
                  <app-icon name="link" sizeClass="h-4 w-4" />
                  <span class="sr-only">(opens in a new tab)</span>
                </a>
              } @else {
                <p class="inline-flex items-center gap-2 text-sm text-muted-soft">
                  <span class="h-1.5 w-1.5 rounded-full bg-muted-soft" aria-hidden="true"></span>
                  {{ project.linkLabel }}
                </p>
              }
            </div>
          </article>
        }
      </div>

      @if (visibleProjects().length === 0) {
        <p class="py-10 text-center text-muted-soft">No projects in this category yet.</p>
      }
    </section>
  `,
})
export class Projects {
  protected readonly filters = PROJECT_FILTERS;
  protected readonly activeFilter = signal<ProjectFilter>('all');

  protected readonly visibleProjects = computed<readonly Project[]>(() => {
    const filter = this.activeFilter();
    return filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => {
          const categories = Array.isArray(project.category)
            ? project.category
            : [project.category];
          return categories.includes(filter);
        });
  });

  protected categoryLabel(category: ProjectCategory): string {
    return {
      web: 'Web',
      mobile: 'Mobile',
      data: 'Data',
      systems: 'Systems',
    }[category];
  }
}
