/** Fixed-window limiter keyed by client address. In-memory: use a shared store if you run several instances. */
export function createRateLimiter(maxRequests: number, windowMs: number, now: () => number = Date.now) {
  const hits = new Map<string, { count: number; resetAt: number }>();
  return {
    allow(key: string): boolean {
      const current = now();
      const entry = hits.get(key);
      if (!entry || entry.resetAt <= current) {
        hits.set(key, { count: 1, resetAt: current + windowMs });
        return true;
      }
      if (entry.count >= maxRequests) return false;
      entry.count += 1;
      return true;
    },
  };
}
