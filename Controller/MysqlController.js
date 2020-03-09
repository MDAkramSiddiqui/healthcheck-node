const path = require('path');
const mysqlClient = require('./../others/mysqlClient');
const CONSTANTS = require('./../others/constant');
const logger = require('./../others/logger');

const scriptName = path.basename(__filename);

class MysqlController { 
  
  static async getAndUpdateCount(req,res,next) {
    try {
      logger.debug(`${scriptName}, getAndUpdateCount()`);
      const status = await mysqlClient.getClientStatus();
      if(status.status === CONSTANTS.CONNECTION_CRIT) {
        req.count = 0;
      }else {
        const count = await mysqlClient.getCount();
        req.count = count;
        mysqlClient.updateCount(count+1);
      }
    }catch(err) {
      logger.error(err);
      throw new Error(err.message);
    }

    // mysqlClient.closeConnection();
  
    next();
  }
  
}

module.exports = MysqlController;