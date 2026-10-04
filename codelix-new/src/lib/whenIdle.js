/* Run fn once the browser is idle (at most `timeout` ms from now), so
   set-up work that measures layout — ScrollTriggers, pins — doesn't run in
   the same task as hydration. Returns a cancel function for effect cleanup. */
export function whenIdle(fn, timeout = 1200) {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  /* Safari has no requestIdleCallback */
  const t = setTimeout(fn, 200);
  return () => clearTimeout(t);
}

/* For useEffect: `useEffect(() => idleEffect(() => { ...; return cleanup; }), [])`
   runs the set-up when idle and returns a cleanup that either cancels the
   pending set-up or runs the cleanup it returned. Effects deferred this way
   run in the order they were declared. */
export function idleEffect(setup, timeout) {
  let cleanup;
  let disposed = false;
  const cancel = whenIdle(() => {
    if (!disposed) cleanup = setup();
  }, timeout);
  return () => {
    disposed = true;
    cancel();
    if (typeof cleanup === "function") cleanup();
  };
}
