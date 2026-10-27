import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { INTERESTS } from '../data/portfolio.data';
import { SectionHeading } from '../shared/section-heading';

@Component({
  selector: 'app-interests',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="interests" class="page-section scroll-mt-24">
      <app-section-heading text="Interests" index="06" subtitle="What I gravitate towards outside the work." />
      <ul class="flex flex-wrap gap-3">
        @for (interest of interests; track interest) {
          <li>
            <button
              type="button"
              (click)="interestClicked.emit(interest)"
              class="rounded-full border border-line-soft px-5 py-2.5 text-sm text-muted transition-colors duration-200 hover:border-line-strong hover:text-fg"
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
