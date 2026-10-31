/* Read-only Supabase access for the public site.

   The public pages only ever run one kind of query — select every column
   from a table, filter on equality, sort — which PostgREST serves over plain
   HTTP. Pulling in @supabase/supabase-js for that put a ~216KB client (auth,
   realtime, storage) on the homepage and every page with testimonials,
   blog posts or case studies, and constructing it started auth timers during
   load. The admin panel still uses the full client from supabaseClient.js.

   Resolves to { data, error } like the supabase-js builder, so callers read
   the result the same way. */
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function selectRows(table, { eq = {}, order, select = "*" } = {}) {
  if (!url || !key) {
    return Promise.resolve({ data: null, error: new Error("Supabase env vars not set") });
  }

  const params = new URLSearchParams({ select });
  for (const [column, value] of Object.entries(eq)) params.append(column, `eq.${value}`);
  if (order) params.append("order", `${order.column}.${order.ascending ? "asc" : "desc"}`);

  return fetch(`${url}/rest/v1/${table}?${params}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`${table}: HTTP ${res.status}`))))
    .then((data) => ({ data, error: null }))
    .catch((error) => ({ data: null, error }));
}
