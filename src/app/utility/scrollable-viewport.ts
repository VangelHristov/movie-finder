import {ViewportScroller} from '@angular/common';
import {Router, Scroll} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {AfterViewInit} from '@angular/core';

export class ScrollableViewport implements AfterViewInit {
    scrollPosition: [number, number];

    constructor(public viewportScroller: ViewportScroller, router: Router) {
        router.events
              .pipe(
                  filter(e => e instanceof Scroll),
                  map(e => e as Scroll)
              )
              .subscribe(e => {
                  if (e.position) {
                      this.scrollPosition = e.position;
                  } else {
                      this.scrollPosition = [0, 0];
                  }
              });
    }

    ngAfterViewInit(): void {
        this.viewportScroller.scrollToPosition(this.scrollPosition);
    }
}
