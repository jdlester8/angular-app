import { Component, Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalGeneratorService {

  public signal$: Subject<{time: number, value: number}>;
  public signals$: Array<Subject<{time: number, value: number}>>;
  private interval: number;
  private generator: Clock;

  constructor(@Inject("clockInterval") @Optional() interval: number) {
    this.signal$ = new Subject<{time: number, value: number}>();
    this.interval = interval || 50;
    this.startClock();
  }

  createSignal(): Subject<{time: number, value: number}> {
    const i = this.signals$.push(new Subject<{time: number, value: number}>());
    return this.signals$[i];
  }

  private async startClock() {
    this.generator = new Clock(this.interval);
    for await (const obj of this.generator) {
      this.signal$.next({
        time: obj.time,
        value: obj.value
      });
    }
  }

  updateInterval(interval: number) {
    this.generator.update(interval);
  }

  getInterval() {
    return this.interval;
  }
}

class Clock implements AsyncIterable<{time: number, value: number}> {
  startTime = performance.now();
  interval: number;

  constructor(interval?: number) {
    this.interval = interval ?? 50;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<{time: number, value: number}> {
    let expectedTime = this.startTime;

    while (true) {
      const currentTime = performance.now();
      const timeSinceStart = currentTime - this.startTime;
      yield {
        time: timeSinceStart,
        value: Math.sin(currentTime)
      };

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
