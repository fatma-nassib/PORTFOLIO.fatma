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
 * Sequences the direct children of the host into a staggered entrance on first
 * view. The motion itself lives in `styles.css` (`[data-stagger] > *`); this
 * only decides *when* each child starts.
 *
 * Children are hidden for one frame before the first paint so a fast scroll
 * never shows them snap into place from the wrong state.
 */
@Directive({
  selector: '[appStagger]',
  standalone: true,
})
export class Stagger implements AfterViewInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  /** Milliseconds between each child's entrance. */
  @Input() staggerGap = 70;

  /** Cap on the accumulated delay, so long lists do not crawl in. */
  @Input() staggerMax = 600;

  /** Where in the sequence the host starts its own children. */
  @Input() staggerStart = 0;

  ngAfterViewInit(): void {
    const host = this.element.nativeElement;
    const items = Array.from(host.children) as HTMLElement[];
    if (items.length === 0) {
      return;
    }

    this.renderer.setAttribute(host, 'data-stagger', '');
    this.time(items);

    const view = this.document.defaultView;
    if (!view?.IntersectionObserver) {
      this.reveal();
      return;
    }

    this.observer = new view.IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.reveal();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );
    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  /** Resolves the delay only when the item actually appears. */
  private time(items: HTMLElement[]): void {
    items.forEach((item, index) => {
      const delay = Math.min(this.staggerStart + index * this.staggerGap, this.staggerStart + this.staggerMax);
      this.renderer.setStyle(item, 'transitionDelay', `${delay}ms`);
    });
  }

  private reveal(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    this.renderer.addClass(this.element.nativeElement, 'is-staggered');
  }
}
