/**
 * Created by najorcruzcruz on 14/7/16.
 */
"use strict";
var fs = require('fs');
exports.readConfigFile = function () {
    return JSON.parse(fs.readFileSync('config/config.json', 'utf8'));
};
//# sourceMappingURL=utils.js.map