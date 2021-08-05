const process = require('process');
const { app } = require('electron');

const win = process.platform === 'win32';
const osx = process.platform === 'darwin';
const linux = !['win32', 'darwin'].includes(process.platform);

module.exports = is = {
    win,
    osx,
    linux,
    dev: !app.isPackaged,
    one: (bool, ...conditions) => conditions.includes(bool),
    all: (bool, ...conditions) => !conditions.includes(!bool)
};
