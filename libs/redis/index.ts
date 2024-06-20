import { Redis } from "@upstash/redis";

export class RedisDB {
  private static _instance: RedisDB;
  private static _redisDB: Redis;

  private constructor() {
    RedisDB._redisDB = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public set<TData>(
    servicePrefix: string,
    key: string,
    value: TData,
    eternal: boolean = false,
  ) {
    const redisKey = `${servicePrefix}:${key}`;
    if (eternal) return RedisDB._redisDB.set(redisKey, value);
    return RedisDB._redisDB.set(redisKey, value, { ex: 600 });
  }

  public get<TData>(servicePrefix: string, key: string) {
    const redisKey = `${servicePrefix}:${key}`;
    return RedisDB._redisDB.get<TData>(redisKey);
  }
}
