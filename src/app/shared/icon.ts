import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type IconName =
  | 'envelope'
  | 'github'
  | 'linkedin'
  | 'phone'
  | 'download'
  | 'arrow-down'
  | 'menu'
  | 'close';

type IconDef = { readonly filled: boolean; readonly d: string };

const ICONS: Record<IconName, IconDef> = {
  envelope: {
    filled: false,
    d: 'M2.25 6.75c0-.83.67-1.5 1.5-1.5h16.5c.83 0 1.5.67 1.5 1.5v10.5c0 .83-.67 1.5-1.5 1.5H3.75c-.83 0-1.5-.67-1.5-1.5V6.75Zm1.9-.25L12 12.4l7.85-5.9',
  },
  github: {
    filled: true,
    d: 'M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.1c-3.2.7-3.87-1.4-3.87-1.4-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.68 5.4-5.24 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z',
  },
  linkedin: {
    filled: true,
    d: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.06 3.79-2.06C21.5 8.58 22 11 22 14.1V21h-4v-6.12c0-1.46-.03-3.33-2.03-3.33-2.03 0-2.34 1.59-2.34 3.23V21h-4V9Z',
  },
  download: { filled: false, d: 'M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 19.5h16' },
  phone: {
    filled: false,
    d: 'M6.6 3.5h2.2l1.6 4-2 1.4a12.5 12.5 0 0 0 6.7 6.7l1.4-2 4 1.6v2.2a2.6 2.6 0 0 1-2.8 2.6C10.4 19.4 4.6 13.6 4 6.3A2.6 2.6 0 0 1 6.6 3.5Z',
  },
  'arrow-down': { filled: false, d: 'M12 4v16m0 0 5-5m-5 5-5-5' },
  menu: { filled: false, d: 'M4 7h16M4 12h16M4 17h16' },
  close: { filled: false, d: 'M6 6l12 12M18 6 6 18' },
};

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      [attr.fill]="def().filled ? 'currentColor' : 'none'"
      [attr.stroke]="def().filled ? 'none' : 'currentColor'"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      [class]="sizeClass()"
    >
      <path [attr.d]="def().d" />
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly sizeClass = input<string>('h-5 w-5');
  protected readonly def = computed(() => ICONS[this.name()]);
}
