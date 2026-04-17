import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const token = import.meta.env.TRACKSINO_TOKEN;

  if (!token) {
    return new Response(JSON.stringify({ error: 'Token not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const upstream = await fetch(
      'https://api.tracksino.com/crazytime_history?limit=100&sort_by=time&sort_desc=true',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!upstream.ok) {
      return new Response(
        JSON.stringify({ error: `Upstream error: ${upstream.status}` }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await upstream.json();

    return new Response(
      JSON.stringify({
        updated_at: new Date().toISOString(),
        rows: data.data ?? data.rows ?? [],
        count: data.count ?? data.total ?? 0,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Fetch failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
