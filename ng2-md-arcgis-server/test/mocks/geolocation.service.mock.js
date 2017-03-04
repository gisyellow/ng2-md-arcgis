/**
 * Created by najorcruzcruz on 14/7/16.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeolocationServiceMock = (function () {
    function GeolocationServiceMock() {
    }
    GeolocationServiceMock.prototype.getLocation = function () {
        return new Promise(function (fulfill, reject) {
            fulfill({});
        });
    };
    GeolocationServiceMock.prototype.getIpAddress = function () {
        return new Promise(function (fulfill, reject) {
            fulfill('192.168.1.1');
        });
    };
    return GeolocationServiceMock;
}());
exports.GeolocationServiceMock = GeolocationServiceMock;
