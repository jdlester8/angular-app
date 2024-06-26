import { Component, Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  public clock$: Subject<number>;
  private clock: Clock;

  constructor() {
    this.clock$ = new Subject<number>();
    this.clock = new Clock(10000); // Initialize with the default interval of 10 seconds
    this.startClock();
  }

  private async startClock() {
    for await (const tick of this.clock) {
      this.clock$.next(tick);
    }
  }

  updateInterval(interval: number) {
    this.clock.update(interval);
  }

  getInterval() {
    return this.clock.interval;
  }
}

class Clock implements AsyncIterable<number> {
  private startTime: number;
  interval: number;

  constructor(interval?: number) {
    this.interval = interval ?? 1000;
    this.startTime = performance.now();
  }

  async *[Symbol.asyncIterator](): AsyncIterator<number> {
    let expectedTime = this.startTime;

    while (true) {
      const currentTime = performance.now();
      const timeSinceStart = currentTime - this.startTime;
      yield timeSinceStart;

      // Calculate the next expected time
      expectedTime += this.interval;

      // Calculate the delay required to stay on track
      const delay = Math.max(0, expectedTime - performance.now());
      await this.delay(delay);
    }
  }

  delay(ms: number) {
    return new Promise<void>(resolve => {
      const start = performance.now();
      const channel = new MessageChannel();
      const checkElapsedTime = () => {
        if (performance.now() - start >= ms) {
          resolve();
        } else {
          channel.port2.postMessage('');
        }
      };
      channel.port1.onmessage = checkElapsedTime;
      channel.port2.postMessage(''); // Start the loop
    });
  }

  update(interval: number) {
    this.interval = interval;
  }
}