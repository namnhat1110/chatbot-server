import NodeCache from "node-cache";

export class CacheService {
  private cache: NodeCache;

  constructor(ttlSeconds: number = 3600) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
    });
  }

  get<T>(key: string): T | undefined {
    return this.cache.get(key);
  }

  set<T>(key: string, value: T): void {
    this.cache.set(key, value);
  }

  del(key: string): void {
    this.cache.del(key);
  }
}
