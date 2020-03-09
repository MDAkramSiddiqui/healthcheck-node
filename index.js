const express = require('express');
const app = express();
const logger = require('./others/logger');
const MysqlController = require('./Controller/MysqlController');
const mysqlClient = require('./others/mysqlClient');
const redisClient = require('./others/redisClient');

redisClient.getClientStatus()
  .then(res => logger.info(res.message))
  .catch(err => logger.error(err.message));

mysqlClient.getClientStatus()
  .then(res => logger.info(res.message))
  .catch(err => logger.error(err.message));

app.use(MysqlController.getAndUpdateCount);

app.get('/', (req, res) => {
  res.send(`
  <h1 style='align: center'>Page Counter</h1>
  Thank You visiting my website, including you the total visitors are : ${req.count}
  `);
});

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  logger.info(`Listening to Port: ${PORT}`);
});