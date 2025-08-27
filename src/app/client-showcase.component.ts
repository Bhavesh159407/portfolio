import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Client {
  name: string;
  logoUrl: string;
  website?: string;
  description?: string;
  businesses?: string[];
  documents?: any[];
  repos?: any[];
  videos?: any[];
}

@Component({
  selector: 'app-client-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative w-full py-12 md:py-16 lg:py-20" [attr.aria-label]="title">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="mb-8 text-center text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
          {{ title }}
        </h2>

        <div class="space-y-8">
          <!-- First row scrolling left, faster -->
          <div class="relative overflow-hidden">
            <div class="fade-edge-left"></div>
            <div class="fade-edge-right"></div>
            <div class="animate-scroll-left-fast flex w-max gap-10">
              <div 
                *ngFor="let client of loopedClients; trackBy: trackByIndex" 
                class="logo-card group block cursor-pointer"
                (click)="openClientModal(client)"
                [attr.aria-label]="client.name">
                <div class="flex h-20 w-40 items-center justify-center rounded-2xl bg-white-5 p-4 shadow-lg ring-1 ring-white-10 transition-transform duration-300 hover-scale-105 hover-bg-white-10">
                  <img
                    [src]="client.logoUrl"
                    [alt]="client.name"
                    class="max-h-12 max-w-full opacity-80 transition duration-300 group-hover-opacity-100"
                    loading="lazy"
                    (error)="onImageError($event, client)"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Second row scrolling right, slower -->
          <div class="relative overflow-hidden">
            <div class="fade-edge-left"></div>
            <div class="fade-edge-right"></div>
            <div class="animate-scroll-right-slow flex w-max gap-10">
              <div 
                *ngFor="let client of loopedClients; trackBy: trackByIndex" 
                class="logo-card group block cursor-pointer"
                (click)="openClientModal(client)"
                [attr.aria-label]="client.name">
                <div class="flex h-20 w-40 items-center justify-center rounded-2xl bg-white-5 p-4 shadow-lg ring-1 ring-white-10 transition-transform duration-300 hover-scale-105 hover-bg-white-10">
                  <img
                    [src]="client.logoUrl"
                    [alt]="client.name"
                    class="max-h-12 max-w-full opacity-80 transition duration-300 group-hover-opacity-100"
                    loading="lazy"
                    (error)="onImageError($event, client)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .fade-edge-left {
      pointer-events: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 8rem;
      background: linear-gradient(to right, #000000, transparent);
      z-index: 10;
    }

    .fade-edge-right {
      pointer-events: none;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 8rem;
      background: linear-gradient(to left, #000000, transparent);
      z-index: 10;
    }

    .animate-scroll-left-fast {
      animation: scrollLeft 20s linear infinite;
    }

    .animate-scroll-right-slow {
      animation: scrollRight 35s linear infinite;
    }

    .animate-scroll-left-fast:hover,
    .animate-scroll-right-slow:hover {
      animation-play-state: paused;
    }

    @keyframes scrollLeft {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    @keyframes scrollRight {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }

    .logo-card {
      transition: all 0.3s ease;
    }

    .logo-card:hover {
      transform: translateY(-5px);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .animate-scroll-left-fast {
        animation-duration: 15s;
      }
      
      .animate-scroll-right-slow {
        animation-duration: 25s;
      }
    }
  `]
})
export class ClientShowcaseComponent implements OnInit {
  @Input() title: string = "Our Valued Clients";
  @Input() clients: Client[] = [];
  
  loopedClients: Client[] = [];

  ngOnInit() {
    // Create duplicated clients for seamless infinite scrolling
    this.loopedClients = [...this.clients, ...this.clients];
  }

  trackByIndex(index: number): number {
    return index;
  }

  onImageError(event: any, client: Client) {
    console.error(`Failed to load logo for ${client.name}, using fallback`);
    const companyName = client.name || "Company";
    const encodedName = encodeURIComponent(companyName);
    event.target.src = `https://via.placeholder.com/200x200/EF4444/FFFFFF?text=${encodedName}`;
  }

  openClientModal(client: Client) {
    // Emit event or call service to open modal
    console.log('Opening modal for client:', client);
    // You can implement modal opening logic here or emit an event
  }
}
