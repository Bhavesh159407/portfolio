import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styles: []
})
export class AppComponent implements OnInit {
  clients: any[] = [];

  ngOnInit() {
    // Load clients data
    this.loadClients();
  }

  async loadClients() {
    try {
      const response = await fetch('/data/clients.json');
      this.clients = await response.json();
    } catch (error) {
      console.error('Failed to load clients:', error);
      // Fallback to default clients if needed
      this.clients = [];
    }
  }
}
