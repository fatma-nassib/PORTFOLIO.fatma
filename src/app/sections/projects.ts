import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';

import {
  PROJECT_FILTERS,
  PROJECTS,
  type Project,
  type ProjectCategory,
} from '../data/portfolio.data';
import { Icon } from '../shared/icon';
import { SectionHeading } from '../shared/section-heading';
import { Spotlight } from '../shared/spotlight.directive';
import { Stagger } from '../shared/stagger.directive';

type ProjectFilter = ProjectCategory | 'all';

@Component({
  selector: 'app-projects',
  imports: [Icon, SectionHeading, Stagger, Spotlight],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projects" class="page-section scroll-mt-24">
      <app-section-heading text="Projects" index="04" subtitle="Projects for commuters, farmers, and health workers." />

      <div class="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
        @for (filter of filters; track filter.value) {
          <button
            type="button"
            role="tab"
            [attr.aria-selected]="activeFilter() === filter.value"
            (click)="activeFilter.set(filter.value)"
            class="rounded-[20px] border px-4 py-2 text-sm transition-[color,background-color,border-color,transform] duration-200 ease-[var(--ease-out-quart)] active:scale-[0.97]"
            [class]="
              activeFilter() === filter.value
                ? 'border-fg bg-fg text-canvas'
                : 'border-line-soft text-muted hover:border-line-strong hover:text-fg'
            "
          >
            {{ filter.label }}
          </button>
        }
      </div>

      <!--
        Keyed on the filter so switching tabs replays the sequence: the @for
        re-creates the cards and the stagger directive runs again over them.
      -->
      <div
        #grid
        appStagger
        [staggerGap]="60"
        [staggerMax]="420"
        [attr.data-filter]="activeFilter()"
        class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        @for (project of visibleProjects(); track project.title) {
          <article
            appSpotlight
            class="group relative flex flex-col rounded-2xl border border-line-soft p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_24px_48px_-36px_rgba(0,0,0,0.5)]"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="text-base font-semibold text-fg">{{ project.title }}</h3>
                <p class="mt-1 text-[11px] uppercase tracking-[0.12em] text-accent/90">{{ project.subtitle }}</p>
              </div>
              @if (project.featured) {
                <span class="shrink-0 rounded-full bg-surface px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-muted">
                  Featured
                </span>
              }
            </div>

            <p class="mt-4 text-sm leading-relaxed text-muted">{{ project.description }}</p>

            <ul class="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
              @for (tech of project.stack; track tech) {
                <li class="tag px-2 py-0.5 font-mono text-[11px] text-muted-soft">
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
                  class="link-draw inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-fg"
                >
                  {{ project.linkLabel }}
                  <app-icon
                    name="link"
                    sizeClass="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  <span class="sr-only">(opens in a new tab)</span>
                </a>
              } @else {
                <p class="inline-flex items-center gap-2 text-sm text-muted-soft">
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
  private readonly grid = viewChild<ElementRef<HTMLElement>>('grid');

  constructor() {
    // Replays the entrance after a filter switch. The directive timings are read
    // untracked, so only the filter itself triggers a run; the empty read forces
    // the cards in and the write on the next tick lets the directive fade them
    // back up in sequence.
    effect(() => {
      this.activeFilter();
      const grid = this.grid()?.nativeElement;
      if (!grid) {
        return;
      }
      grid.classList.remove('is-staggered');
      void grid.offsetHeight;
      afterNextRender(() => grid.classList.add('is-staggered'));
    });
  }

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
