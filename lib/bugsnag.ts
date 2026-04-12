import Bugsnag from '@bugsnag/js';

// Prevent initializing multiple times during hot-reloading in development
if (process.env.BUGSNAG_API_KEY) {
  if (!Bugsnag.isStarted()) {
    Bugsnag.start({ 
      apiKey: process.env.BUGSNAG_API_KEY,
      releaseStage: process.env.NODE_ENV,
      enabledReleaseStages: ['production']
    });
  }
} else {
  console.warn('Bugsnag API key not found in environment. Bugsnag will not be initialized.');
}

export const notifyError = async (error: any, request: Request, metadata?: Record<string, any>) => {
  if (process.env.NODE_ENV !== 'production') {
    return; // Opt out of executing and logging locally to avoid noise
  }

  if (Bugsnag.isStarted()) {
    return new Promise<void>((resolve) => {
      Bugsnag.notify(
        error instanceof Error ? error : new Error(error?.message || error || 'Unknown Error'),
        function (event) {
          event.addMetadata('request', {
            url: request.url,
            method: request.method,
            ip: request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'Unknown IP',
            headers: Object.fromEntries(request.headers.entries()),
          });
          if (metadata) {
            Object.keys(metadata).forEach(key => {
              event.addMetadata(key, metadata[key]);
            });
          }
        },
        function () {
          // Resolved when delivery is complete (success or failure)
          resolve();
        }
      );
    });
  }
};

export default Bugsnag;
