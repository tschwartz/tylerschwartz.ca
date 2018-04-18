{
    importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

    workbox.precaching.precacheAndRoute([
        'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.1.1/webcomponents-loader.js',
        '/dist/ts-elements.html',
        '/dist/ts-elements.js'
    ]);

    /**
     * Cache pages
     */
    workbox.routing.registerRoute('/', workbox.strategies.staleWhileRevalidate());
    workbox.routing.registerRoute('/about/', workbox.strategies.staleWhileRevalidate());
    workbox.routing.registerRoute('/contact/', workbox.strategies.staleWhileRevalidate());
    workbox.routing.registerRoute('/work/', workbox.strategies.staleWhileRevalidate());

    /**
     * Cache CSS and JavaScript
     */
    workbox.routing.registerRoute(
        /\.(?:css|js)$/,
        workbox.strategies.staleWhileRevalidate()
    );

    /**
     * Cache images for 30 days
     */
    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ],
        })
    );

    /**
     * Offline Google Analytics
     */
    workbox.googleAnalytics.initialize();
    workbox.routing.registerRoute(
        'https://www.google-analytics.com/analytics.js',
        workbox.strategies.staleWhileRevalidate()
    )

    /**
     * Lifecycle events
     */
    self.addEventListener('install', event => {
        console.info('SW installing');
    });

    self.addEventListener('activate', event => {
        console.info('SW activating');
    });
}
