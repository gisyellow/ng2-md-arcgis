/**
 * Created by najorcruzcruz on 11/7/16.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var geolocation_service_1 = require("../../../app/services/geolocation.service");
var testing_1 = require("@angular/core/testing");
var http_1 = require("@angular/http");
var testing_2 = require("@angular/core/testing");
require("rxjs/add/operator/toPromise");
describe('Geolocation Service', function () {
    var geolocationService;
    beforeEach(function () { return testing_2.addProviders([
        http_1.HTTP_PROVIDERS, geolocation_service_1.GeolocationService
    ]); });
    beforeEach(testing_1.inject([geolocation_service_1.GeolocationService], function (geo) {
        geolocationService = geo;
    }));
    it('Get geographical location', function (done) {
        geolocationService.getLocation().then(function (coords) {
            expect(coords).toBeDefined();
            expect(coords.latitude).toBeDefined();
            expect(coords.longitude).toBeDefined();
            done();
        }).catch(function (error) {
            fail(error);
            done();
        });
    }, 20000);
    it('Get IP address', function (done) {
        geolocationService.getIpAddress()
            .then(function (ip) {
            expect(ip).toBeDefined();
            expect(ip).toMatch(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
            done();
        })
            .catch(function (error) {
            fail(error);
            done();
        });
    }, 10000);
});
