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
      class="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 lg:px-10"
    >
      <app-section-heading text="Certifications" />

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        @for (cert of certifications; track cert.name) {
          <article
            class="flex flex-col rounded-2xl border border-magenta/40 bg-white/5 p-6 transition hover:-translate-y-1.5 hover:border-magenta hover:shadow-[0_0_25px_rgba(255,0,255,0.18)]"
          >
            <h3 class="text-base font-semibold leading-snug text-white">{{ cert.name }}</h3>
            <p class="mt-2 text-sm text-zinc-400">{{ cert.issuer }}</p>
            <p class="mt-1 text-xs text-zinc-500">Issued: {{ cert.issued }}</p>

            @if (cert.url) {
              <a
                [href]="cert.url"
                target="_blank"
                rel="noopener noreferrer"
                (click)="certificateOpened.emit(cert)"
                class="mt-auto inline-block pt-4 text-sm font-medium text-neon transition hover:text-magenta hover:underline"
              >
                View Certificate →
                <span class="sr-only">(opens in a new tab)</span>
              </a>
            } @else {
              <button
                type="button"
                (click)="certificateOpened.emit(cert)"
                class="mt-auto inline-block pt-4 text-left text-sm font-medium text-neon transition hover:text-magenta hover:underline"
              >
                View Certificate →
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
