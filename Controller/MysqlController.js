const path = require('path');
const mysqlClient = require('./../others/mysqlClient');
const redisClient = require('./../others/redisClient');
const CONSTANTS = require('./../others/constant');
const logger = require('./../others/logger');

const scriptName = path.basename(__filename);

class MysqlController { 
  
  static async getAndUpdateCount(req,res) {
    try {
      logger.debug(`${scriptName}, getAndUpdateCount()`);
      let initialTime, finalTime;
      initialTime = Date.now();
      const mysqlStatus = await mysqlClient.getClientStatus();
      finalTime = Date.now();
      console.log(mysqlStatus);
      mysqlStatus.time = (finalTime - initialTime);
      initialTime = Date.now();
      const redisStatus = await redisClient.getClientStatus();
      finalTime = Date.now();
      redisStatus.time = (finalTime - initialTime);
      // const requestCounter = await mysqlClient.updateCount();
      const requestCounter = {
        requestCounter: 125
      };
      const temp = Object.assign({}, { mysqlStatus }, { redisStatus }, { requestCounter });
      const result = Object.keys(temp).map(i => temp[i]);
      console.log(result);
      res.send(result);
    }catch(err) {
      logger.error(err);
      // res = result;
      throw new Error(err.message);
    }

  }
  
}

module.exports = MysqlController;