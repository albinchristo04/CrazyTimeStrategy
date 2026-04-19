interface Env {
  TRACKSINO_TOKEN: string;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const token = env.TRACKSINO_TOKEN;
  if (!token) {
    return new Response(JSON.stringify({ error: 'Token not configured', hint: 'Set TRACKSINO_TOKEN in Cloudflare Pages environment variables' }), {
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
      const body = await upstream.text().catch(() => '');
      return new Response(
        JSON.stringify({ error: `Upstream error: ${upstream.status}`, detail: body.slice(0, 200) }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await upstream.json() as Record<string, unknown>;
    return new Response(
      JSON.stringify({
        updated_at: new Date().toISOString(),
        rows: (data.data ?? data.rows ?? []) as unknown[],
        count: (data.count ?? data.total ?? 0) as number,
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
    return new Response(JSON.stringify({ error: 'Fetch failed', detail: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
