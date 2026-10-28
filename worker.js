export default {
  async fetch(request, env) {
    if (!env.ASSETS) return new Response('Preview unavailable', { status: 503 });
    const clean = new Request(request);
    clean.headers.delete('authorization');
    clean.headers.delete('proxy-authorization');
    const response = await env.ASSETS.fetch(clean);
    const headers = new Headers(response.headers);
    headers.set('Cache-Control', 'private, no-store');
    headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'DENY');
    headers.set('Referrer-Policy', 'no-referrer');
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
    headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://us-assets.i.posthog.com https://us.i.posthog.com https://rybbit.computerdx.com; connect-src 'self' https://us.i.posthog.com https://us-assets.i.posthog.com https://rybbit.computerdx.com; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'none'; object-src 'none'");
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
};
