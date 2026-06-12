const KEY = 'visits';

export async function onRequestPost({ env, request }) {
  const current = parseInt(await env.VISITS_KV.get(KEY) ?? '0', 10);
  const next = current + 1;
  const ua = request.headers.get('user-agent') ?? '';

  // Skip obvious bots
  if (/bot|crawler|spider|curl|wget|python|Go-http/i.test(ua)) {
    return json({ visits: current, recorded: false });
  }

  await env.VISITS_KV.put(KEY, String(next));
  return json({ visits: next, recorded: true });
}

export async function onRequestGet({ env }) {
  const count = parseInt(await env.VISITS_KV.get(KEY) ?? '0', 10);
  return json({ visits: count });
}

function json(data) {
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}
