import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Tracks the pointer across a card and writes `--sx` / `--sy` as percentages.
 * `.spotlight` in `styles.css` renders a soft accent sheen at that point.
 *
 * Colour only, with no shadow or elevation, so the card surfaces stay flat.
 */
@Directive({
  selector: '[appSpotlight]',
  standalone: true,
})
export class Spotlight implements AfterViewInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  private frame?: number;
  private host?: HTMLElement;

  private readonly onMove = (event: Event): void => {
    const pointer = event as PointerEvent;
    const host = this.host;
    if (!host) {
      return;
    }

    const rect = host.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return;
    }
    const sx = ((pointer.clientX - rect.left) / rect.width) * 100;
    const sy = ((pointer.clientY - rect.top) / rect.height) * 100;

    if (this.frame !== undefined) {
      cancelAnimationFrame(this.frame);
    }
    this.frame = requestAnimationFrame(() => {
      this.frame = undefined;
      host.style.setProperty('--sx', `${sx.toFixed(1)}%`);
      host.style.setProperty('--sy', `${sy.toFixed(1)}%`);
    });
  };

  ngAfterViewInit(): void {
    const host = this.element.nativeElement as HTMLElement;
    const view = this.document.defaultView;
    if (!view || !view.matchMedia('(pointer: fine)').matches || view.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.host = host;
    this.renderer.addClass(host, 'spotlight');
    this.renderer.listen(host, 'pointerenter', this.onMove);
    this.renderer.listen(host, 'pointermove', this.onMove);
  }

  ngOnDestroy(): void {
    if (this.frame !== undefined) {
      cancelAnimationFrame(this.frame);
    }
  }
}
