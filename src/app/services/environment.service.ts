import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

export interface AppFeatures {
  enableAnalytics: boolean;
  enableDebugging: boolean;
  mockApi: boolean;
}

export interface Environment {
  production: boolean;
  apiUrl: string;
  appName: string;
  enableLogging: boolean;
  version: string;
  features: AppFeatures;
}

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private readonly env: Environment = environment;

  get isProduction(): boolean {
    return this.env.production;
  }

  get isDevelopment(): boolean {
    return !this.env.production;
  }

  get apiUrl(): string {
    return this.env.apiUrl;
  }

  get appName(): string {
    return this.env.appName;
  }

  get version(): string {
    return this.env.version;
  }

  get features(): AppFeatures {
    return this.env.features;
  }

  get enableLogging(): boolean {
    return this.env.enableLogging;
  }

  // Utility methods
  log(message: string, data?: any): void {
    if (this.enableLogging) {
      console.log(`[${this.appName}] ${message}`, data || '');
    }
  }

  warn(message: string, data?: any): void {
    if (this.enableLogging) {
      console.warn(`[${this.appName}] ${message}`, data || '');
    }
  }

  error(message: string, data?: any): void {
    if (this.enableLogging) {
      console.error(`[${this.appName}] ${message}`, data || '');
    }
  }

  // Get full environment object (useful for debugging)
  getEnvironment(): Environment {
    return { ...this.env };
  }
}
