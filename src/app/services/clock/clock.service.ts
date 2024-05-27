import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  clock$: Subject<number>;

  constructor() {
    this.clock$ = new Subject<number>();
    this.processClock();
  }

  private async processClock() {
    const clock = new Clock();
    for await (const tick of clock) {
      this.clock$.next(tick);
    }
  }
}

class Clock implements AsyncIterable<number> {
  startTime = performance.now();

  async *[Symbol.asyncIterator](): AsyncIterator<number> {
    let expectedTime = this.startTime;

    while (true) {
      const currentTime = performance.now();
      const timeSinceStart = currentTime - this.startTime;
      yield timeSinceStart;

      // Calculate the next expected time
      expectedTime += 1000;

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
}
