const path = require('path');
const express = require('express');
const app = express();
const logger = require('./others/logger');
const MysqlController = require('./Controller/MysqlController');
const mysqlClient = require('./others/mysqlClient');
const redisClient = require('./others/redisClient');

// redisClient.getClientStatus()
//   .then(res => logger.info(res.message))
//   .catch(err => logger.error(err.message));

// mysqlClient.getClientStatus()
//   .then(res => logger.info(res.message))
//   .catch(err => logger.error(err.message));

app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));

app.use('/healthcheck', MysqlController.getAndUpdateCount);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  logger.info(`Listening to Port: ${PORT}`);
});