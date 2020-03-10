const redis = require('redis');
const CONSTANTS = require('./constant');

class RedisClient {
  // constructor() {
  //   this.client = redis.createClient({
  //     host: process.env.REDIS_HOST || '127.0.0.1',
  //     port: process.env.REDIS_PORT || '6379'
  //   });

  //   this.status = new Promise((resolve, reject) => {
  //     this.client.on('connect', () => resolve({
  //       status: CONSTANTS.CONNECTION_OK,
  //       message: CONSTANTS.REDIS_CONNECT_OK
  //     }));

  //     this.client.on('error', err => reject({
  //       status: CONSTANTS.CONNECTION_CRIT,
  //       message: `${CONSTANTS.REDIS_CONNECT_CRIT} ${err.message}.`
  //     }));
  //   });

  // }

  static async getClientStatus() {

    const client = redis.createClient({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || '6379'
    });

    return new Promise((resolve, reject) => {
      client.on('connect', () => resolve({
        service: 'redis',
        status: CONSTANTS.CONNECTION_OK,
        message: CONSTANTS.REDIS_CONNECT_OK,
        time: null
      }));

      client.on('error', err => reject({
        service: 'redis',
        status: CONSTANTS.CONNECTION_CRIT,
        message: `${CONSTANTS.REDIS_CONNECT_CRIT} ${err.message}.`,
        time: null
      }));
    });

    // client.end(true);
    // return result;
  }
  
  // async getClientStatus() {
  //   return this.status;
  // }

  // async closeConnection() {
  //   this.client.end(true);
  // }

}

module.exports = RedisClient;

