// Environment configuration for development
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'My Test App (Development)',
  enableLogging: true,
  version: '1.0.0-dev',
  features: {
    enableAnalytics: false,
    enableDebugging: true,
    mockApi: true
  }
};
