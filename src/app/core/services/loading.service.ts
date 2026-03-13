import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Loading {
  private isLoadingSignal = signal(false);

  public readonly isLoading = computed(() => this.isLoadingSignal());

  show(): void {
    this.showTime = Date.now();

    this.isLoadingSignal.set(true);
  }

  hide(): void {
    const now = Date.now();
    const duration = now - this.showTime;
    if (duration < this.MIN_DISPLAY_MS) {
      setTimeout(() => this.isLoadingSignal.set(false), this.MIN_DISPLAY_MS - duration);
    } else {
      this.isLoadingSignal.set(false);
    }
    this.isLoadingSignal.set(false);
  }
  private showTime = 0;
  private MIN_DISPLAY_MS = 300;
}
