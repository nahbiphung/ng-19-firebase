import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { EnvironmentService } from './services/environment.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my-test-19-app';

  private readonly envService = inject(EnvironmentService);

  ngOnInit(): void {
    this.envService.log('App component initialized');
    this.envService.log('Environment loaded', this.envService.getEnvironment());
  }

  get environmentInfo() {
    return {
      appName: this.envService.appName,
      version: this.envService.version,
      isProduction: this.envService.isProduction,
      isDevelopment: this.envService.isDevelopment,
      apiUrl: this.envService.apiUrl,
      features: this.envService.features
    };
  }
}
