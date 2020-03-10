const path = require('path');
const mysqlClient = require('./../others/mysqlClient');
const redisClient = require('./../others/redisClient');
const CONSTANTS = require('./../others/constant');
const logger = require('./../others/logger');

const scriptName = path.basename(__filename);

class MysqlController { 
  
  static async getAndUpdateCount(req,res) {
    try {
      logger.info(`${scriptName}, getAndUpdateCount()`);
      
      const mysqlStatus = await mysqlClient.getClientStatus();
      const redisStatus = await redisClient.getClientStatus();
      const count = await mysqlClient.getCount();
      const requestCounter = {
        requestCounter: count
      };

      const temp = Object.assign({}, { mysqlStatus }, { redisStatus }, { requestCounter });
      const result = Object.keys(temp).map(i => temp[i]);
      res.send(result);
    }catch(err) {
      logger.error(err);
      // res = result;
      throw new Error(err.message);
    }

  }
  
}

module.exports = MysqlController;