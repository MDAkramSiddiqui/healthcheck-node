const chalk = require('chalk');

class logger{
  static debug(val) {
    console.log(chalk.yellowBright(`[DEBUG] ${val}`));
  }
  static info(val) {
    console.log(chalk.hex('#49e5d0')(`[INFO] ${val}`));
  }
  static error(val) {
    console.log(chalk.red(`[ERROR] ${val}`));
  }
}

module.exports = logger;