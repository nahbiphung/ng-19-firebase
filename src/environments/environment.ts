// Environment configuration for production
export const environment = {
  production: true,
  apiUrl: 'https://api.myapp.com',
  appName: 'My Test App',
  enableLogging: false,
  version: '1.0.0',
  features: {
    enableAnalytics: true,
    enableDebugging: false,
    mockApi: false
  }
};
