import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { CERTIFICATIONS, type Certification } from '../data/portfolio.data';
import { SectionHeading } from '../shared/section-heading';

@Component({
  selector: 'app-certifications',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="certifications"
      class="page-section scroll-mt-24"
    >
      <app-section-heading text="Certifications" index="05" subtitle="Credentials and programmes completed." />

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        @for (cert of certifications; track cert.name) {
          <article class="card-outline group flex flex-col p-6">
            <h3 class="text-base font-semibold leading-snug text-fg">{{ cert.name }}</h3>
            <p class="mt-2 text-sm text-muted">{{ cert.issuer }}</p>
            <p class="mt-1 text-xs uppercase tracking-[0.14em] text-muted-soft">Issued {{ cert.issued }}</p>

            @if (cert.url) {
              <a
                [href]="cert.url"
                target="_blank"
                rel="noopener noreferrer"
                (click)="certificateOpened.emit(cert)"
                class="mt-auto inline-block pt-4 text-sm font-medium text-accent transition-colors hover:text-fg"
              >
                View Certificate
                <span class="sr-only">(opens in a new tab)</span>
              </a>
            } @else {
              <button
                type="button"
                (click)="certificateOpened.emit(cert)"
                class="mt-auto inline-block pt-4 text-left text-sm font-medium text-accent transition-colors hover:text-fg"
              >
                View Certificate
              </button>
            }
          </article>
        }
      </div>
    </section>
  `,
})
export class Certifications {
  protected readonly certifications = CERTIFICATIONS;
  readonly certificateOpened = output<Certification>();
}
