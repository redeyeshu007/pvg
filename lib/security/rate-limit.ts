/**
 * Lightweight In-Memory Sliding Window Rate Limiter
 *
 * Prevents automated form submission spam and abusive traffic.
 * Default: Maximum 5 booking enquiries per IP within a 10-minute window.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // 5 submissions per window

// Periodically clean up stale entries (every 15 minutes)
if (typeof setInterval !== "undefined") {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitStore.entries()) {
      record.timestamps = record.timestamps.filter((t) => now - t < WINDOW_MS);
      if (record.timestamps.length === 0) {
        rateLimitStore.delete(ip);
      }
    }
  }, 15 * 60 * 1000);

  // Allow Node.js process to exit without waiting for this timer
  if (cleanupTimer.unref) {
    cleanupTimer.unref();
  }
}

export interface RateLimitResult {
  readonly allowed: boolean;
  readonly remaining: number;
  readonly retryAfterSeconds?: number;
}

/**
 * Checks whether the given client identifier is within the rate limit.
 */
export function checkRateLimit(clientId: string): RateLimitResult {
  const now = Date.now();
  const record = rateLimitStore.get(clientId) || { timestamps: [] };

  // Remove timestamps older than WINDOW_MS
  record.timestamps = record.timestamps.filter((t) => now - t < WINDOW_MS);

  if (record.timestamps.length >= MAX_REQUESTS) {
    const oldest = record.timestamps[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000));
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  record.timestamps.push(now);
  rateLimitStore.set(clientId, record);

  return {
    allowed: true,
    remaining: MAX_REQUESTS - record.timestamps.length,
  };
}

/**
 * Helper to extract client IP from Next.js / Render request headers.
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",").map((ip) => ip.trim());
    if (ips[0]) return ips[0];
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const renderClientIp = req.headers.get("cf-connecting-ip");
  if (renderClientIp) return renderClientIp.trim();

  return "127.0.0.1";
}
