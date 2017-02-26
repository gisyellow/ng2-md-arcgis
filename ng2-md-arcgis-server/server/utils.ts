/**
 * Created by najorcruzcruz on 14/7/16.
 */

const fs = require('fs');

export var readConfigFile = () => {
    return JSON.parse(fs.readFileSync('config/config.json', 'utf8'));
}