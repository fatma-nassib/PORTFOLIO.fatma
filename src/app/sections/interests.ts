import { ChangeDetectionStrategy, Component } from '@angular/core';

import { INTERESTS } from '../data/portfolio.data';
import { SectionHeading } from '../shared/section-heading';

@Component({
  selector: 'app-interests',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="interests" class="page-section scroll-mt-24">
      <app-section-heading text="Interests" index="06" subtitle="Outside of work." />
      <ul class="flex flex-wrap gap-3">
        @for (interest of interests; track interest) {
          <li>
            <span
              class="rounded-full border border-line-soft px-5 py-2.5 text-sm text-muted"
            >
              {{ interest }}
            </span>
          </li>
        }
      </ul>
    </section>
  `,
})
export class Interests {
  protected readonly interests = INTERESTS;
}
