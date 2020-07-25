const ewelink = require('ewelink-api');
const log4js = require('log4js');
const pi = require('rpi-gpio');

require('dotenv').config();
const logger = log4js.getLogger();
logger.level = "debug";
const connection = new ewelink({
    email: 'jpitlor@gmail.com',
    password: process.env.PASSWORD,
});
let fan;

const Channel = {
    FAN_LOW: 1,
    FAN_MEDIUM: 2,
    FAN_HIGH: 3,
    LIGHT: 4,
}
const RFID_PIN = 1;

(async () => {
    const [response] = await connection.getDevices();
    fan = response.deviceid;

    pi.setup(RFID_PIN, 'in', 'rising', (error) => {
        if (error) {
            logger.error(error);
            return;
        }

        await connection.setDevicePowerState(fan, Channel.LIGHT, 'toggle');
    })
})();