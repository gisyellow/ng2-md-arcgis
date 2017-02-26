"use strict";
var constants_1 = require("../app/constants");
var PointSocket = (function () {
    function PointSocket(server, callback) {
        this.server = server;
        this.callback = callback;
        this.io = require('socket.io').listen(this.server);
        this.io.set("origins", "*:*");
        this.io.on('connection', function (socket) {
            if (callback) {
                callback();
            }
        });
    }
    PointSocket.prototype.emit = function (message, params) {
        this.io.sockets.emit(message, params);
    };
    PointSocket.prototype.emitNewPoint = function (point) {
        this.emit(constants_1.EMIT_NEW_POINT, point);
    };
    PointSocket.prototype.emitUpdatePoint = function (point) {
        this.emit(constants_1.EMIT_UPDATED_POINT, point);
    };
    PointSocket.prototype.emitRemovePoint = function (point) {
        this.emit(constants_1.EMIT_REMOVED_POINT, point);
    };
    return PointSocket;
}());
exports.PointSocket = PointSocket;
//# sourceMappingURL=socket.js.map