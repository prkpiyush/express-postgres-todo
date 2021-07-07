import redis, { RedisClient } from 'redis';
import { promisify } from 'util';

import { logger } from '../middlewares/logger';

class RedisWrapper {
  client: RedisClient;

  constructor() {
    this.client = redis.createClient();
    this.client.on('connect', () => {
      logger.info('Successfully connected to redis server');
    });
    this.client.on('error', err => {
      logger.error(err);
    });
  }

  getAsync = (key: string) => {
    return promisify(this.client.get).apply(this.client, [key]);
  };

  setAsync = (key: string, time: number, value: any) => {
    return promisify(this.client.setex).apply(this.client, [key, time, value]);
  };
}

export default new RedisWrapper();
