import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CONTACT_FORM_ENDPOINT, CONTACT_LINKS, PROFILE } from '../data/portfolio.data';
import { Icon } from '../shared/icon';
import { SectionHeading } from '../shared/section-heading';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Icon, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="page-section scroll-mt-24">
      <app-section-heading
        text="Contact"
        index="07"
        subtitle="Have a project, a role or a question in mind? Let's talk."
      />

      <div class="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-12">
        <div class="flex flex-col gap-6">
          <p class="max-w-sm text-body leading-relaxed text-muted">
            The quickest way to reach me is WhatsApp or email. The form opens your
            email app with everything filled in.
          </p>

          <div class="flex flex-col gap-2.5">
            @for (link of links; track link.label) {
              <a
                [href]="link.href"
                [title]="link.title"
                [attr.aria-label]="link.title"
                [attr.target]="link.href.startsWith('http') ? '_blank' : null"
                [attr.rel]="link.href.startsWith('http') ? 'noopener noreferrer' : null"
                class="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm text-muted transition-colors duration-200 hover:border-line-soft hover:bg-surface/40 hover:text-fg"
              >
                <span
                  class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-soft text-fg transition-colors duration-200 group-hover:border-accent/60 group-hover:text-accent"
                >
                  <app-icon [name]="link.icon" sizeClass="h-4 w-4" />
                </span>
                <span class="flex min-w-0 flex-col">
                  <span class="text-[10px] uppercase tracking-[0.18em] text-muted-soft">{{ link.label }}</span>
                  <span class="truncate text-sm text-fg/90">{{ link.value }}</span>
                </span>
              </a>
            }
          </div>
        </div>

      <form
        [formGroup]="form"
        (ngSubmit)="submit()"
        class="flex w-full flex-col gap-3 rounded-[20px] border border-line-soft p-6 md:p-8"
        novalidate
      >
        <label class="sr-only" for="name">Your Name</label>
        <input
          id="name"
          type="text"
          formControlName="name"
          placeholder="Your Name"
          autocomplete="name"
          class="w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-fg/90 placeholder:text-muted-soft transition focus:border-accent focus:outline-none"
          [class.border-line-soft]="!showError('name')"
          [class.border-red-400]="showError('name')"
        />
        @if (showError('name')) {
          <p class="-mt-2 text-left text-xs text-red-400">Please enter your name.</p>
        }

        <label class="sr-only" for="email">Your Email</label>
        <input
          id="email"
          type="email"
          formControlName="email"
          placeholder="Your Email"
          autocomplete="email"
          class="w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-fg/90 placeholder:text-muted-soft transition focus:border-accent focus:outline-none"
          [class.border-line-soft]="!showError('email')"
          [class.border-red-400]="showError('email')"
        />
        @if (showError('email')) {
          <p class="-mt-2 text-left text-xs text-red-400">Please enter a valid email.</p>
        }

        <label class="sr-only" for="message">Your Message</label>
        <textarea
          id="message"
          rows="4"
          formControlName="message"
          placeholder="Your Message"
          class="w-full resize-y rounded-xl border bg-transparent px-4 py-3 text-sm text-fg/90 placeholder:text-muted-soft transition focus:border-accent focus:outline-none"
          [class.border-line-soft]="!showError('message')"
          [class.border-red-400]="showError('message')"
        ></textarea>
        @if (showError('message')) {
          <p class="-mt-2 text-left text-xs text-red-400">Please add a message.</p>
        }

        <button
          type="submit"
          [disabled]="status() === 'sending'"
          class="btn btn-filled mt-2 self-start rounded-full px-7 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ status() === 'sending' ? 'Sending…' : 'Send Message' }}
        </button>

        @if (!hasEndpoint) {
          <p class="text-xs text-muted-soft">
            The form is not connected yet. Your message opens in your email app instead.
          </p>
        }

        @if (statusMessage()) {
          <p
            class="text-sm"
            [class.text-accent]="status() === 'success'"
            [class.text-red-400]="status() === 'error'"
            role="status"
          >
            {{ statusMessage() }}
          </p>
        }
      </form>
      </div>
    </section>
  `,
})
export class Contact {
  private readonly fb = inject(FormBuilder);

  protected readonly links = CONTACT_LINKS;
  protected readonly hasEndpoint = CONTACT_FORM_ENDPOINT.trim().length > 0;
  protected readonly submitted = signal(false);
  protected readonly status = signal<FormStatus>('idle');
  protected readonly statusMessage = signal('');

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(5)]],
  });

  protected showError(controlName: 'name' | 'email' | 'message'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.submitted());
  }

  protected submit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.status.set('error');
      this.statusMessage.set('Please fill in all fields correctly.');
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (!this.hasEndpoint) {
      this.openMailFallback(value);
      return;
    }

    this.status.set('sending');
    this.statusMessage.set('Sending your message…');

    fetch(CONTACT_FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(value),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        this.status.set('success');
        this.statusMessage.set(`Thanks ${value.name}! Your message has been sent.`);
        this.form.reset();
        this.submitted.set(false);
      })
      .catch(() => {
        this.status.set('error');
        this.statusMessage.set('Could not send your message. Please email me directly instead.');
      });
  }

  private openMailFallback(value: { name: string; email: string; message: string }): void {
    const subject = encodeURIComponent(`Portfolio enquiry from ${value.name}`);
    const body = encodeURIComponent(`${value.message}\n\n, ${value.name} (${value.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    this.status.set('success');
    this.statusMessage.set(`Opening your email app to send this to ${PROFILE.email}.`);
  }
}
