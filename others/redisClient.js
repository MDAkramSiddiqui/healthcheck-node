const redis = require('redis');
const CONSTANTS = require('./constant');
const logger = require('./logger');

class RedisClient {

  static async getClientStatus() {

    let time = Date.now();
    logger.debug(CONSTANTS.REDIS_CONNECT_START);

    const client = redis.createClient({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || '6379'
    });

    const result = await new Promise((resolve, reject) => {
      client.on('connect', () => resolve({
        service: 'redis',
        status: CONSTANTS.CONNECTION_OK,
        message: CONSTANTS.REDIS_CONNECT_OK,
        time: null
      }));
    
      client.on('error', err => resolve({
        service: 'redis',
        status: CONSTANTS.CONNECTION_CRIT,
        message: `${CONSTANTS.REDIS_CONNECT_CRIT} ${err.message}.`,
        time: null
      }));
    });

    client.end(true);
    logger.debug(CONSTANTS.REDIS_CONNECT_END);

    time = Date.now() - time;
    result.time = time;
    return result;
  }

}

module.exports = RedisClient

