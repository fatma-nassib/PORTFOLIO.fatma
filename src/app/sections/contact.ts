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
    <section id="contact" class="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 lg:px-10">
      <div class="flex flex-col items-center text-center">
        <app-section-heading text="Contact" subtitle="Let’s collaborate! Fill out the form below." />
      </div>

      <form
        [formGroup]="form"
        (ngSubmit)="submit()"
        class="mx-auto flex w-full max-w-xl flex-col gap-4"
        novalidate
      >
        <label class="sr-only" for="name">Your Name</label>
        <input
          id="name"
          type="text"
          formControlName="name"
          placeholder="Your Name"
          autocomplete="name"
          class="w-full rounded-lg border bg-white/10 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition focus:border-magenta focus:outline-none"
          [class.border-neon]="!showError('name')"
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
          class="w-full rounded-lg border bg-white/10 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition focus:border-magenta focus:outline-none"
          [class.border-neon]="!showError('email')"
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
          class="w-full resize-y rounded-lg border bg-white/10 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition focus:border-magenta focus:outline-none"
          [class.border-neon]="!showError('message')"
          [class.border-red-400]="showError('message')"
        ></textarea>
        @if (showError('message')) {
          <p class="-mt-2 text-left text-xs text-red-400">Please add a message.</p>
        }

        <button
          type="submit"
          [disabled]="status() === 'sending'"
          class="self-center rounded-full bg-gradient-to-r from-neon to-magenta px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-neon/20 transition hover:-translate-y-0.5 hover:shadow-neon/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {{ status() === 'sending' ? 'Sending…' : 'Send Message' }}
        </button>

        @if (!hasEndpoint) {
          <p class="text-center text-xs text-zinc-500">
            The form is not connected yet — your message opens in your email app instead.
          </p>
        }

        @if (statusMessage()) {
          <p
            class="text-center text-sm"
            [class.text-neon]="status() === 'success'"
            [class.text-red-400]="status() === 'error'"
            role="status"
          >
            {{ statusMessage() }}
          </p>
        }
      </form>

      <p class="mt-14 text-center text-zinc-400">Or reach out via email or social media.</p>

      <div class="mt-6 flex justify-center gap-5">
        @for (link of links; track link.label) {
          <a
            [href]="link.href"
            [title]="link.title"
            [attr.aria-label]="link.title"
            [attr.target]="link.href.startsWith('http') ? '_blank' : null"
            [attr.rel]="link.href.startsWith('http') ? 'noopener noreferrer' : null"
            class="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-neon to-magenta text-white transition hover:scale-110 hover:shadow-[0_0_20px_rgba(0,247,255,0.5)]"
          >
            <app-icon [name]="link.icon" />
          </a>
        }
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
    const body = encodeURIComponent(`${value.message}\n\n— ${value.name} (${value.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    this.status.set('success');
    this.statusMessage.set(`Opening your email app to send this to ${PROFILE.email}.`);
  }
}
