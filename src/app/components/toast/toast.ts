import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if(toast()) {
      <div
        class="toast-container"
        [ngClass]="toast()?.type"
        (click)="close()"
      >
        <p>{{ toast()?.message }}</p>
      </div>
    }
  `,
  styleUrl: './toast.scss',
})
export class ToastComponent {
  private toastService = inject(ToastService);
  toast = this.toastService.toast;

  close() {
    this.toastService.clear();
  }
}
