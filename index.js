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
    FAN_LOW: 2,
    FAN_MEDIUM: 3,
    FAN_HIGH: 4,
    LIGHT: 1,
}
const ENTER_ROOM_PIN = 10;
const EXIT_ROOM_PIN = 12;

connection
    .getDevices()
    .then(([response]) => {
        fan = response.deviceid;
        logger.info(`Fan ID: ${fan}`);
    });

function logError(e) {
    if (e) {
        logger.error(e);
    }
}

pi.on('change', async (channel) => {
    logger.info(`Detected a motion in channel ${channel}!`);
    logger.info(`Person just ${channel === ENTER_ROOM_PIN ? 'entered' : 'exited'} the room`);

    if (!fan) {
        logger.error('API not ready yet!');
        return;
    }

    await connection.setDevicePowerState(fan, channel === ENTER_ROOM_PIN ? 'on' : 'off', Channel.LIGHT);
});

pi.setup(ENTER_ROOM_PIN, pi.DIR_IN, pi.EDGE_RISING, logError);
pi.setup(EXIT_ROOM_PIN, pi.DIR_IN, pi.EDGE_RISING, logError);

