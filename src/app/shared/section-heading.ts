import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Editorial section lockup: numbered eyebrow, oversized stamped statement,
 * and a short lede set in the body face.
 */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6 border-t border-hillside-ink pt-5 md:gap-8">
      <div class="flex items-baseline justify-between gap-6">
        @if (index()) {
          <p class="eyebrow text-muted/60">{{ index() }}</p>
        }
        @if (eyebrow()) {
          <p class="eyebrow text-muted/60">{{ eyebrow() }}</p>
        }
      </div>

      <h2 class="screamer size-heading max-w-[16ch]">{{ text() }}</h2>

      @if (subtitle()) {
        <p class="max-w-xl text-body-lg leading-snug text-muted/80">{{ subtitle() }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly text = input.required<string>();
  readonly subtitle = input<string>('');
  readonly eyebrow = input<string>('');
  /** Two-digit section number, e.g. "01". */
  readonly index = input<string>('');
}
