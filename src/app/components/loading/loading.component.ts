import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center">
      <div class="flex gap-2">
        <div class="pill"></div>
        <div class="pill"></div>
        <div class="pill"></div>
      </div>
    </div>
  `,
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {}

