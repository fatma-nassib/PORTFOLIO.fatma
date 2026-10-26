import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import lottie, { AnimationItem } from 'lottie-web';

/**
 * Lightweight Lottie animation player.
 * Renders a single, subtle animation from a LottieFiles URL.
 * Automatically cleans up the animation instance on destroy.
 */
@Component({
  selector: 'app-lottie-player',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="lottie-container" [class]="containerClass()"></div>`,
  styles: [
    `
      :host {
        display: block;
      }
      .lottie-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
      }
    `,
  ],
})
export class LottiePlayer {
  private readonly document = inject(DOCUMENT);

  readonly animationUrl = input.required<string>();
  readonly containerClass = input<string>('');
  readonly loop = input(true);
  readonly autoplay = input(true);
  readonly renderer = input<'svg' | 'canvas' | 'html'>('svg');

  private animation?: AnimationItem;

  constructor() {
    effect(() => {
      this.render();
    });
  }

  private render(): void {
    this.destroy();
    const container = this.document.querySelector('.lottie-container');
    if (!container) {
      return;
    }
    this.animation = lottie.loadAnimation({
      container,
      renderer: this.renderer(),
      loop: this.loop(),
      autoplay: this.autoplay(),
      path: this.animationUrl(),
    });
  }

  private destroy(): void {
    if (this.animation) {
      this.animation.destroy();
      this.animation = undefined;
    }
  }
}