const mysql = require('mysql');
const logger = require('./logger');
const CONSTANTS = require('./constant');

class MysqlClient {

    static async getClientStatus() {

      let time = Date.now();
      logger.debug(CONSTANTS.MYSQL_CONNECT_START);
      
      const client = mysql.createConnection({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || 'web_chat',
        port: parseInt(process.env.MYSQL_PORT) || 3306
      });

      const result = await new Promise((resolve, reject) => {
        client.connect(err => {
          
          if(err) resolve({
            service: 'mysql',
            status: CONSTANTS.CONNECTION_CRIT,
            message: `${CONSTANTS.MYSQL_CONNECT_CRIT} ${err.message}`,
            time: null
          });
          else resolve({
            service: 'mysql',
            status: CONSTANTS.CONNECTION_OK,
            message: CONSTANTS.MYSQL_CONNECT_OK,
            time: null
          });
        });
      });

      client.end(() => {
        logger.debug(CONSTANTS.MYSQ_CONNECT_END);
      });

      time = Date.now() - time;

      result.time = time;

      return result;

    }

    static async getCount() {
      
      const client = mysql.createConnection({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || 'web_chat',
        port: parseInt(process.env.MYSQL_PORT) || 3306
      });

      const result = await new Promise((resolve, reject) => {
        client.query("SELECT * FROM pagecounter", (err, pagecounter) => {
          if(err) {
            resolve(0);
          }else {
            const data = JSON.parse(JSON.stringify(pagecounter));
            resolve(data[0].count);
          }
        });
      });

      client.query(`UPDATE pagecounter SET count = ${result + 1} WHERE id = 1`);

      client.end();

      return result;

    }

}

module.exports = MysqlClient;
