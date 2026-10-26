import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ABOUT_TEXT, IMAGES } from '../data/portfolio.data';
import { SectionHeading } from '../shared/section-heading';

@Component({
  selector: 'app-about',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="about"
      class="mx-auto flex max-w-6xl scroll-mt-24 flex-col gap-12 px-6 py-20 md:flex-row md:items-center lg:px-10"
    >
      <div class="md:w-1/2">
        <app-section-heading text="About Me" />
        <p class="text-muted md:text-lg">{{ about }}</p>
      </div>

      <div class="md:w-1/2 flex flex-col items-center gap-6">
        <div
          class="relative shrink-0 rounded-[30px] overflow-hidden border border-line bg-surface/5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.35)]"
          style="width: 100%; max-width: 360px; aspect-ratio: 4 / 5"
        >
          <img
            [src]="images.portrait"
            alt="Portrait of Fatma Nassib"
            class="h-full w-full object-cover object-position-center"
          />
        </div>
        <p class="text-center text-xs uppercase tracking-[0.2em] text-muted-soft">
          Fatma Nassib, Software Engineer
        </p>
      </div>
    </section>
  `,
})
export class About {
  protected readonly about = ABOUT_TEXT;
  protected readonly images = IMAGES;
}
