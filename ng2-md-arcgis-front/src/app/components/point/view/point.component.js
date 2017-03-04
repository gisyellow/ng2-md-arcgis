"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by najorcruzcruz on 12/7/16.
 */
var core_1 = require("@angular/core");
var point_1 = require("../../../models/point");
var data_service_1 = require("../../../services/data.service");
var socket_service_1 = require("../../../services/socket.service");
var PointComponent = (function () {
    function PointComponent(mapService, dataService, socketService) {
        var _this = this;
        this.mapService = mapService;
        this.dataService = dataService;
        this.socketService = socketService;
        this.hiddenComponent = true;
        this.mapClickSubscribe = this.mapService.onMapClickObservable
            .subscribe(function (evt) {
            if (evt.isPointClicked) {
                _this.error = undefined;
                _this.hiddenComponent = false;
                _this.dataService.getPoint(evt.pointId)
                    .then(function (returnedPoint) {
                    _this.point = returnedPoint;
                });
            }
        });
        this.onUpdatedPointSubscription = this.socketService.onUpdatedPointObservable
            .subscribe(function (updatedPoint) {
            if (_this.point && updatedPoint._id === _this.point._id) {
                _this.point = updatedPoint;
            }
        });
        this.onRemovedPointSubscription = this.socketService.onRemovedPointObservable
            .subscribe(function (removedPoint) {
            if (_this.point && removedPoint._id === _this.point._id) {
                _this.point = new point_1.Point();
                _this.error = 'Point has gone';
            }
        });
    }
    PointComponent.prototype.closePointComponent = function () {
        this.hiddenComponent = true;
    };
    PointComponent.prototype.ngOnDestroy = function () {
        this.mapClickSubscribe.unsubscribe();
        this.onUpdatedPointSubscription.unsubscribe();
        this.onRemovedPointSubscription.unsubscribe();
    };
    return PointComponent;
}());
PointComponent = __decorate([
    core_1.Component({
        selector: 'my-point',
        templateUrl: 'point.component.html',
        styleUrls: ['point.component.css'],
        providers: [data_service_1.DataService, socket_service_1.SocketService]
    })
], PointComponent);
exports.PointComponent = PointComponent;
