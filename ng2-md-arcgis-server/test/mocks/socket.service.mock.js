"use strict";
var Rx_1 = require("rxjs/Rx");
/**
 * Created by najorcruzcruz on 13/7/16.
 */
var SocketServiceMock = (function () {
    function SocketServiceMock() {
        this.onCreatedPoint = new Rx_1.Subject();
        this.onUpdatedPoint = new Rx_1.Subject();
        this.onRemovedPoint = new Rx_1.Subject();
        this.onCreatedPointObservable = this.onCreatedPoint.asObservable();
        this.onUpdatedPointObservable = this.onUpdatedPoint.asObservable();
        this.onRemovedPointObservable = this.onRemovedPoint.asObservable();
    }
    return SocketServiceMock;
}());
exports.SocketServiceMock = SocketServiceMock;
//# sourceMappingURL=socket.service.mock.js.map