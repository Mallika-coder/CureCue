const rateLimitMap = new Map();

export function rateLimit(ip, limit = 5, windowMs = 60000) {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record) {
        rateLimitMap.set(ip, { count: 1, startTime: now });
        return { success: true, remaining: limit - 1 };
    }

    if (now - record.startTime > windowMs) {
        rateLimitMap.set(ip, { count: 1, startTime: now });
        return { success: true, remaining: limit - 1 };
    }

    if (record.count >= limit) {
        return { success: false, remaining: 0 };
    }

    record.count++;
    return { success: true, remaining: limit - record.count };
}
