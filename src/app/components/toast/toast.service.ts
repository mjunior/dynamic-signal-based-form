import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastConfig {
  type: ToastType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toast = signal<ToastConfig | null>(null);

  show(type: ToastType, message: string) {
    this.toast.set({ type, message });

    // auto-hide after 3 seconds, should fix it on css animation
    setTimeout(() => this.clear(), 3000);
  }

  clear() {
    this.toast.set(null);
  }
}
