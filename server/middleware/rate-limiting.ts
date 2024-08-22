import { H3Event } from "h3";

interface RateLimitData {
  count: number;
  lastRequestTime: number;
}

const rateLimitMap: Record<string, RateLimitData> = {};
const WINDOW_SIZE_MS = howLong(1); // 1 minute window size
const MAX_REQUESTS_PER_WINDOW = 100; // Max requests allowed per window

// Utility function to calculate window size in milliseconds
function howLong(x: number) {
  return x * 60 * 1000;
}

// Rate limiting function by IP
function rateLimitByIP(event: H3Event) {
  const ip = (event.node.req.headers["x-forwarded-for"] ||
    event.node.req.socket.remoteAddress) as string;

  if (!ip) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request - Unable to determine IP address",
    });
  }

  applyRateLimit(ip);
}

// Rate limiting function by User ID
function rateLimitByUserID(event: H3Event) {
  const user = event.context.user;
  if (!user || !user.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request - Unable to determine User ID",
    });
  }

  const userId = user.id;
  applyRateLimit(userId);
}

// Core function to apply rate limiting
function applyRateLimit(identifier: string) {
  const currentTime = Date.now();
  const requestLog = rateLimitMap[identifier] || {
    count: 0,
    lastRequestTime: 0,
  };

  // Determine if current request is within the same window
  if (currentTime - requestLog.lastRequestTime < WINDOW_SIZE_MS) {
    requestLog.count += 1;
  } else {
    // New window, reset count and update time
    requestLog.count = 1;
    requestLog.lastRequestTime = currentTime;
  }

  // Save the updated log for the IP/User ID
  rateLimitMap[identifier] = requestLog;

  if (requestLog.count > MAX_REQUESTS_PER_WINDOW) {
    throw createError({
      statusCode: 429,
      statusMessage: "Too Many Requests - Please try again later",
    });
  }

  console.log(
    `Rate limiting applied to ${identifier} with ${requestLog.count} requests`
  );

  // Cleanup expired entries every minute
  setTimeout(() => {
    const expirationTime = Date.now() - WINDOW_SIZE_MS;
    for (const [key, log] of Object.entries(rateLimitMap)) {
      if (log.lastRequestTime < expirationTime) {
        delete rateLimitMap[key];
      }
    }
  }, howLong(1)); // Runs every minute
}

// Exported handler
export default defineEventHandler((event) => {

  if (event.context.user) {
    // Apply rate limiting by User ID
    rateLimitByUserID(event);
  } else {
    // Apply rate limiting by IP
    rateLimitByIP(event);
  }
});
