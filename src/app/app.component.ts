import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { EnvironmentService } from './services/environment.service';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my-test-19-app';

  private readonly envService = inject(EnvironmentService);
  private readonly firebaseService = inject(FirebaseService);

  ngOnInit(): void {
    this.envService.log('App component initialized');
    this.envService.log('Environment loaded', this.envService.getEnvironment());

    // Subscribe to authentication state
    this.firebaseService.user$.subscribe(user => {
      if (user) {
        this.envService.log('User signed in:', user.email);
      } else {
        this.envService.log('User signed out');
      }
    });
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

  get firebaseInfo() {
    return {
      isAuthenticated: this.firebaseService.isAuthenticated(),
      currentUser: this.firebaseService.getCurrentUser()?.email || 'Not signed in'
    };
  }
}
