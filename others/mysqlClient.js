const mysql = require('mysql');
const CONSTANTS = require('./constant');

class MysqlClient {
  
    // constructor() {
    //   this.client = mysql.createConnection({
    //     host: process.env.MYSQL_HOST || 'localhost',
    //     user: process.env.MYSQL_USER || 'root',
    //     password: process.env.MYSQL_PASSWORD || '',
    //     database: process.env.MYSQL_DATABASE || 'web_chat',
    //     port: parseInt(process.env.MYSQL_PORT) || 3306
    //   });

    //   this.status = new Promise((resolve, reject) => {
    //     this.client.connect(err => {
    //       if(err) reject({
    //         status: CONSTANTS.CONNECTION_CRIT,
    //         message: `${CONSTANTS.MYSQL_CONNECT_CRIT} ${err.message}`
    //       });
    //       else resolve({
    //         status: CONSTANTS.CONNECTION_OK,
    //         message: CONSTANTS.MYSQL_CONNECT_OK
    //       });
    //     });
    //   });
    // }


    static async getClientStatus() {

      
      const client = mysql.createConnection({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || 'web_chat',
        port: parseInt(process.env.MYSQL_PORT) || 3306
      });

      return new Promise((resolve, reject) => {
        client.connect(err => {
          
          if(err) reject({
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

      client.end();

      return result;

    }

    // async getClientStatus() {
    //   return this.status;
    // }

    // async closeConnection() {
    //   this.client.end();
    // }

    // async getCount() {
      
    //   const client = mysql.createConnection({
    //     host: process.env.MYSQL_HOST || 'localhost',
    //     user: process.env.MYSQL_USER || 'root',
    //     password: process.env.MYSQL_PASSWORD || '',
    //     database: process.env.MYSQL_DATABASE || 'web_chat',
    //     port: parseInt(process.env.MYSQL_PORT) || 3306
    //   });

    //   return new Promise((resolve, reject) => {
    //     this.client.query("SELECT * FROM pagecounter", (err, pagecounter) => {
    //       if(err) {
    //         reject(0);
    //       }else {
    //         const data = JSON.parse(JSON.stringify(pagecounter));
    //         resolve(data[0].count);
    //       }
    //     });
    //   });
    // }

    // async updateCount() {
    //   const client = mysql.createConnection({
    //     host: process.env.MYSQL_HOST || 'localhost',
    //     user: process.env.MYSQL_USER || 'root',
    //     password: process.env.MYSQL_PASSWORD || '',
    //     database: process.env.MYSQL_DATABASE || 'web_chat',
    //     port: parseInt(process.env.MYSQL_PORT) || 3306
    //   });

    //   const 

    //   this.client.query(`UPDATE pagecounter SET count = ${count} WHERE id = 1`);
    // }
  
}

module.exports = MysqlClient;
