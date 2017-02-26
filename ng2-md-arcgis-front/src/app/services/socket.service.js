"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by najorcruzcruz on 13/7/16.
 */
var io = require("socket.io-client");
var Rx_1 = require("rxjs/Rx");
var core_1 = require("@angular/core");
var constants_1 = require("../constants");
var SocketService = (function () {
    function SocketService() {
        var _this = this;
        this.onCreatedPoint = new Rx_1.Subject();
        this.onUpdatedPoint = new Rx_1.Subject();
        this.onRemovedPoint = new Rx_1.Subject();
        this.onCreatedPointObservable = this.onCreatedPoint.asObservable();
        this.onUpdatedPointObservable = this.onUpdatedPoint.asObservable();
        this.onRemovedPointObservable = this.onRemovedPoint.asObservable();
        this.socket = io('http://localhost:3000');
        this.socket.on(constants_1.EMIT_NEW_POINT, function (point) {
            _this.onCreatedPoint.next(point);
        });
        this.socket.on(constants_1.EMIT_UPDATED_POINT, function (point) {
            _this.onUpdatedPoint.next(point);
        });
        this.socket.on(constants_1.EMIT_REMOVED_POINT, function (point) {
            _this.onRemovedPoint.next(point);
        });
    }
    SocketService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SocketService);
    return SocketService;
}());
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map