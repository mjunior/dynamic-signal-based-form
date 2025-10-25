import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SidebarItem {
  id: string | number;
  title: string;
}

@Component({
  selector: 'app-section-page-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar-container">
      @for (item of items(); track item.id) {
        <div
          [class]="getItemClasses(item)"
        >
          {{ item.title }}
        </div>
      }
    </div>
  `,
  styleUrl: './section-page-sidebar.component.scss',
})
export class SectionPageSidebarComponent {
  items = input.required<SidebarItem[]>();
  activeItemId = input<string | null>(null);

  isActive(item: SidebarItem): boolean {
    return this.activeItemId() === item.id;
  }

  getItemClasses(item: SidebarItem): string {
    const baseClasses = 'py-4 px-6 cursor-pointer transition-colors duration-200 text-sm';
    
    if (this.isActive(item)) {
      return `${baseClasses} bg-primary-light text-primary border-r-2 border-primary font-medium`;
    }
    
    return `${baseClasses} bg-transparent text-black hover:bg-gray-50`;
  }
}

