// Environment configuration for staging
export const environment = {
  production: false,
  apiUrl: 'https://staging-api.myapp.com',
  appName: 'My Test App (Staging)',
  enableLogging: true,
  version: '1.0.0-staging',
  features: {
    enableAnalytics: true,
    enableDebugging: true,
    mockApi: false
  }
};
