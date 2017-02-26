/**
 * Created by najorcruzcruz on 13/7/16.
 */
"use strict";
var data_service_1 = require("../../../app/services/data.service");
var testing_1 = require('@angular/core/testing');
var http_1 = require('@angular/http');
var testing_2 = require('@angular/core/testing');
var point_1 = require("../../../app/models/point");
var http_mock_1 = require("../../mocks/http.mock");
var geolocation_service_mock_1 = require("../../mocks/geolocation.service.mock");
var geolocation_service_1 = require("../../../app/services/geolocation.service");
describe('Data Service', function () {
    var dataService;
    var http;
    beforeEach(function () { return testing_2.addProviders([
        http_1.HTTP_PROVIDERS, data_service_1.DataService,
        {
            provide: http_1.Http,
            useValue: new http_mock_1.HttpMock()
        },
        {
            provide: geolocation_service_1.GeolocationService,
            useValue: new geolocation_service_mock_1.GeolocationServiceMock()
        },
    ]); });
    beforeEach(testing_1.inject([data_service_1.DataService, http_1.Http], function (ds, h) {
        dataService = ds;
        http = h;
    }));
    it('Get points', function (done) {
        http.setReturnedData([{ firstName: 'FirstName' }]);
        dataService.getPoints()
            .then(function (points) {
            expect(points.length).toBe(1);
            expect(points[0].firstName).toBe('FirstName');
            done();
        })
            .catch(function (error) {
            done(error);
        });
    });
    it('Get point', function (done) {
        http.setReturnedData({ firstName: 'FirstName' });
        dataService.getPoint('someid')
            .then(function (point) {
            expect(point).toBeDefined();
            expect(point.firstName).toBe('FirstName');
            done();
        })
            .catch(function (error) {
            done(error);
        });
    });
    it('Save point', function (done) {
        var point = new point_1.Point();
        point.firstName = 'FirstName';
        http.setReturnedData(point);
        dataService.savePoint(point)
            .then(function (point) {
            expect(point).toBeDefined();
            expect(point.firstName).toBe('FirstName');
            done();
        })
            .catch(function (error) {
            done(error);
        });
    });
    it('Update point', function (done) {
        var point = new point_1.Point();
        point.firstName = 'FirstName';
        http.setReturnedData(point);
        dataService.updatePoint(point)
            .then(function (point) {
            expect(point).toBeDefined();
            expect(point.firstName).toBe('FirstName');
            done();
        })
            .catch(function (error) {
            done(error);
        });
    });
    it('Delete point', function (done) {
        var point = new point_1.Point();
        point.firstName = 'FirstName';
        http.setReturnedData(point);
        dataService.deletePoint(point)
            .then(function (point) {
            expect(point).toBeDefined();
            expect(point.firstName).toBe('FirstName');
            done();
        })
            .catch(function (error) {
            done(error);
        });
    });
});
//# sourceMappingURL=data.service.spec.js.map