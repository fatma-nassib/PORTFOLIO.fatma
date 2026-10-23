import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-10">
      <h2
        class="inline-block border-b-2 border-magenta pb-2.5 text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,0,255,0.35)] sm:text-3xl"
      >
        {{ text() }}
      </h2>
      @if (subtitle()) {
        <p class="mt-4 max-w-2xl text-zinc-400">{{ subtitle() }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly text = input.required<string>();
  readonly subtitle = input<string>('');
}
