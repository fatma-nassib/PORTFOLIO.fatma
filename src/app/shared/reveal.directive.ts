import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class Reveal implements AfterViewInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const view = this.document.defaultView;
    if (!view || !view.IntersectionObserver) {
      return;
    }

    this.renderer.addClass(this.element.nativeElement, 'reveal-on-scroll');
    this.observer = new view.IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.renderer.addClass(this.element.nativeElement, 'is-revealed');
          this.observer?.disconnect();
          this.observer = undefined;
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' },
    );
    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
