import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import {
  LucideArrowDown,
  LucideDownload,
  LucideLink,
  LucideMail,
  LucideMenu,
  LucideMoon,
  LucidePhone,
  LucideSun,
  LucideX,
} from '@lucide/angular';

export type IconName =
  | 'envelope'
  | 'link'
  | 'github'
  | 'linkedin'
  | 'whatsapp'
  | 'phone'
  | 'download'
  | 'arrow-down'
  | 'menu'
  | 'close'
  | 'sun'
  | 'moon';

/**
 * Use Lucide for interface icons; Lucide intentionally does not include brand marks.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LucideMail,
    LucideLink,
    LucidePhone,
    LucideDownload,
    LucideArrowDown,
    LucideMenu,
    LucideX,
    LucideSun,
    LucideMoon,
  ],
  template: `
    @switch (name()) {
      @case ('envelope') {
        <svg lucideMail [class]="sizeClass()" aria-hidden="true" />
      }
      @case ('link') {
        <svg lucideLink [class]="sizeClass()" aria-hidden="true" />
      }
      @case ('github') {
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" [class]="sizeClass()">
          <path
            d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.1c-3.2.7-3.87-1.4-3.87-1.4-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.68 5.4-5.24 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
          />
        </svg>
      }
      @case ('linkedin') {
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" [class]="sizeClass()">
          <path
            d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.06 3.79-2.06C21.5 8.58 22 11 22 14.1V21h-4v-6.12c0-1.46-.03-3.33-2.03-3.33-2.03 0-2.34 1.59-2.34 3.23V21h-4V9Z"
          />
        </svg>
      }
      @case ('whatsapp') {
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" [class]="sizeClass()">
          <path
            d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.06 3.15 4.99 4.42.7.3 1.25.48 1.67.62.71.22 1.35.19 1.86.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35ZM12.05 21.7h-.01a9.6 9.6 0 0 1-4.9-1.34l-.35-.21-3.64.96.97-3.55-.23-.37a9.58 9.58 0 0 1-1.47-5.11c0-5.3 4.32-9.61 9.62-9.61 2.57 0 4.99 1 6.8 2.82a9.55 9.55 0 0 1 2.82 6.8c0 5.3-4.32 9.61-9.61 9.61ZM20.5 3.49A11.5 11.5 0 0 0 12.05.98C5.7.98.53 6.15.53 12.5c0 2.03.53 4.02 1.54 5.77L.44 24l5.87-1.54a11.48 11.48 0 0 0 5.73 1.46h.01c6.35 0 11.52-5.17 11.52-11.52 0-3.08-1.2-5.97-3.07-8.13Z"
          />
        </svg>
      }
      @case ('phone') {
        <svg lucidePhone [class]="sizeClass()" aria-hidden="true" />
      }
      @case ('download') {
        <svg lucideDownload [class]="sizeClass()" aria-hidden="true" />
      }
      @case ('arrow-down') {
        <svg lucideArrowDown [class]="sizeClass()" aria-hidden="true" />
      }
      @case ('menu') {
        <svg lucideMenu [class]="sizeClass()" aria-hidden="true" />
      }
      @case ('close') {
        <svg lucideX [class]="sizeClass()" aria-hidden="true" />
      }
      @case ('sun') {
        <svg lucideSun [class]="sizeClass()" aria-hidden="true" />
      }
      @case ('moon') {
        <svg lucideMoon [class]="sizeClass()" aria-hidden="true" />
      }
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly sizeClass = input<string>('h-5 w-5');
}
