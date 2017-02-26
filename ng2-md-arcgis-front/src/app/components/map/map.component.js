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
 * Created by najorcruzcruz on 11/7/16.
 */
var core_1 = require('@angular/core');
var geolocation_service_1 = require('../../services/geolocation.service');
var map_service_1 = require('../../services/map.service');
var data_service_1 = require("../../services/data.service");
var socket_service_1 = require("../../services/socket.service");
var MapComponent = (function () {
    function MapComponent(geolocationService, mapService, dataservice, socketService) {
        this.geolocationService = geolocationService;
        this.mapService = mapService;
        this.dataservice = dataservice;
        this.socketService = socketService;
        this.idMapElement = 'viewDiv';
        this.onRemovedPointSubscription = this.socketService.onRemovedPointObservable
            .subscribe(function (point) {
            ARCGIS_MODULE.removePoint(point);
        });
        this.onCreatedPointSubscription = this.socketService.onCreatedPointObservable
            .subscribe(function (point) {
            ARCGIS_MODULE.addPoint([point]);
        });
    }
    MapComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        ARCGIS_MODULE.init(this.idMapElement, function () {
            _this.dataservice.getPoints()
                .then(function (points) {
                ARCGIS_MODULE.addPoint(points);
            });
            var opts = {
                onClick: function (evt) {
                    evt.isPointClicked = _this.isClickInsidePoint(evt);
                    if (evt.isPointClicked) {
                        _this.findPointId(evt);
                    }
                    else {
                        _this.mapService.mapClickNext(evt);
                    }
                },
                coords: {}
            };
            _this.geolocationService.getLocation()
                .then(function (coords) {
                opts.coords = coords;
                ARCGIS_MODULE.load(opts);
            }).catch(function (error) {
                ARCGIS_MODULE.load(opts);
            });
        });
    };
    MapComponent.prototype.findPointId = function (evt) {
        var _this = this;
        var interval = setInterval(function () {
            var element = document.querySelector('point-id');
            if (element && element.innerHTML.trim().length > 0) {
                clearInterval(interval);
                evt.pointId = element.innerHTML;
                _this.closePopupArcGis();
                _this.mapService.mapClickNext(evt);
            }
        }, 500);
    };
    MapComponent.prototype.closePopupArcGis = function () {
        document.querySelector('.esri-close-icon').dispatchEvent(new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        }));
    };
    MapComponent.prototype.isClickInsidePoint = function (evt) {
        var points = document.querySelectorAll('image');
        for (var i = 0, len = points.length; i < len; i++) {
            if (evt.center.x >= points[i].getBoundingClientRect().left &&
                evt.center.x <= points[i].getBoundingClientRect().right &&
                evt.center.y >= points[i].getBoundingClientRect().top &&
                evt.center.y <= points[i].getBoundingClientRect().bottom) {
                return true;
            }
        }
        return false;
    };
    MapComponent.prototype.ngOnDestroy = function () {
        this.onRemovedPointSubscription.unsubscribe();
        this.onCreatedPointSubscription.unsubscribe();
    };
    MapComponent = __decorate([
        core_1.Component({
            selector: 'my-map',
            templateUrl: 'app/components/map/map.component.html',
            providers: [geolocation_service_1.GeolocationService, data_service_1.DataService, socket_service_1.SocketService]
        }), 
        __metadata('design:paramtypes', [geolocation_service_1.GeolocationService, map_service_1.MapService, data_service_1.DataService, socket_service_1.SocketService])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map