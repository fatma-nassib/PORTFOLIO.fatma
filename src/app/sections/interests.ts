import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { INTERESTS } from '../data/portfolio.data';
import { SectionHeading } from '../shared/section-heading';

@Component({
  selector: 'app-interests',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="interests" class="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 lg:px-10">
      <app-section-heading text="Interests" />
      <ul class="flex flex-wrap gap-3">
        @for (interest of interests; track interest) {
          <li>
            <button
              type="button"
              (click)="interestClicked.emit(interest)"
              class="rounded-full border border-accent/60 bg-surface/5 px-5 py-2.5 text-sm text-fg/80 transition hover:scale-105 hover:border-accent hover:bg-accent/10 hover:text-accent"
            >
              {{ interest }}
            </button>
          </li>
        }
      </ul>
    </section>
  `,
})
export class Interests {
  protected readonly interests = INTERESTS;
  readonly interestClicked = output<string>();
}
