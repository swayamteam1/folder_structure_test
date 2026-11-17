export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', worker: 'active', timestamp: new Date() }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response('PERN Cloudflare Edge Worker active.', { status: 200 });
  }
};
