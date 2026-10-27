import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Pulls the host a few pixels toward the pointer, then releases it on leave.
 * The offset is written as `--mx` / `--my`; `.magnetic` in `styles.css` turns
 * those into a transform, so nothing here touches layout.
 *
 * Pointer-fine only. Touch devices have no cursor to follow.
 */
@Directive({
  selector: '[appMagnetic]',
  standalone: true,
})
export class Magnetic implements AfterViewInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  /** Maximum travel in pixels at the element's edge. */
  @Input() magneticStrength = 6;

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
    // -1 at the left/top edge, +1 at the right/bottom edge.
    const x = ((pointer.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((pointer.clientY - rect.top) / rect.height - 0.5) * 2;
    const strength = this.magneticStrength;

    if (this.frame !== undefined) {
      cancelAnimationFrame(this.frame);
    }
    this.frame = requestAnimationFrame(() => {
      this.frame = undefined;
      host.style.setProperty('--mx', (x * strength).toFixed(2));
      host.style.setProperty('--my', (y * strength).toFixed(2));
    });
  };

  private readonly onLeave = (): void => {
    const host = this.host;
    if (this.frame !== undefined) {
      cancelAnimationFrame(this.frame);
      this.frame = undefined;
    }
    host?.style.setProperty('--mx', '0');
    host?.style.setProperty('--my', '0');
  };

  ngAfterViewInit(): void {
    const host = this.element.nativeElement as HTMLElement;
    const view = this.document.defaultView;
    if (!view || !view.matchMedia('(pointer: fine)').matches || view.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.host = host;
    this.renderer.addClass(host, 'magnetic');
    this.renderer.listen(host, 'pointerenter', this.onMove);
    this.renderer.listen(host, 'pointermove', this.onMove);
    this.renderer.listen(host, 'pointerleave', this.onLeave);
    this.renderer.listen(host, 'blur', this.onLeave);
  }

  ngOnDestroy(): void {
    if (this.frame !== undefined) {
      cancelAnimationFrame(this.frame);
    }
  }
}
