const config = {
  pollingInterval: 60_000, // 1 minute
  defaultTransition: 'fade',
  supportedMediaTypes: ['image', 'video'],
  offlineFallbackEnabled: true,
  scheduleCacheTTL: 300, // seconds
  versionCheckInterval: 30_000,
};

export default config;
