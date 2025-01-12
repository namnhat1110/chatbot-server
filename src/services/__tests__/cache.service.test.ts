import { CacheService } from "@services/cache.service";

describe("CacheService", () => {
  let cacheService: CacheService;

  beforeEach(() => {
    cacheService = new CacheService();
  });

  it("should set and get a value", () => {
    cacheService.set("key", "value");
    expect(cacheService.get("key")).toBe("value");
  });

  it("should delete a value", () => {
    cacheService.set("key", "value");
    cacheService.del("key");
    expect(cacheService.get("key")).toBeUndefined();
  });
});
