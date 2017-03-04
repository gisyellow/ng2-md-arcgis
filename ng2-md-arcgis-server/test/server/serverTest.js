/**
 * Created by najorcruzcruz on 12/7/16.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("../../server/server");
var contantsTest_1 = require("./contantsTest");
var databaseService_1 = require("../../server/databaseService");
var http = require('http');
var request = require('request');
var assert = require('assert');
describe('Server test', function () {
    var server;
    var dataService;
    var pointId;
    before(function (done) {
        dataService = new databaseService_1.DatabaseService();
        server = new server_1.NodeServer(3000, dataService);
        server.initDevMode();
        var data = {
            firstName: 'Test 1', lastName: contantsTest_1.LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        };
        dataService.savePoint(data)
            .then(function (point) {
            pointId = point._id;
            done();
        })
            .catch(function (error) {
            done(error);
        });
    });
    after(function () {
        server.close();
        dataService.removePointLastName(contantsTest_1.LAST_NAME_TEST);
        dataService.disconnect();
    });
    it('should return 200', function (done) {
        http.get('http://localhost:3000', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });
    it('Get Points', function (done) {
        http.get('http://localhost:3000/api/points', function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                var json = JSON.parse(body);
                assert.equal(typeof json, 'object');
                assert.ok(json.length > 0, 'Fill up the test database');
                done();
            });
        });
    });
    it('Get Point by id', function (done) {
        http.get("http://localhost:3000/api/points/" + pointId, function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                var point = JSON.parse(body);
                assert.equal(typeof point, 'object');
                assert.equal(typeof point.firstName, 'string');
                assert.equal(typeof point.email, 'string');
                done();
            });
        });
    });
    it('Put new Point', function (done) {
        var data = {
            firstName: 'Jose', lastName: contantsTest_1.LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        };
        request.post('http://localhost:3000/api/points', { form: data }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var newPoint = JSON.parse(body);
                assert.equal(typeof newPoint, 'object');
                assert.equal(newPoint.firstName, 'Jose');
                assert.equal(newPoint.lastName, contantsTest_1.LAST_NAME_TEST);
                assert.equal(newPoint.email, 'jose@fito.gmail');
                done();
            }
            else {
                done(response.statusCode + " - " + error + "\n" + body);
            }
        });
    });
    it('Delete new Point', function (done) {
        var data = {
            firstName: 'Jose', lastName: contantsTest_1.LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        };
        request.post('http://localhost:3000/api/points', { form: data }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var newPoint = JSON.parse(body);
                request.del("http://localhost:3000/api/points/" + newPoint._id, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var result = JSON.parse(body);
                        assert.equal(result.ok, 1);
                        done();
                    }
                    else {
                        done(response.statusCode + " - " + error + "\n " + body);
                    }
                });
            }
            else {
                done(error);
            }
        });
    });
    it('Update new Point', function (done) {
        var data = {
            firstName: 'Jose', lastName: contantsTest_1.LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        };
        request.post('http://localhost:3000/api/points', { form: data }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var newPoint = JSON.parse(body);
                var id_1 = newPoint._id;
                request.put("http://localhost:3000/api/points/" + newPoint._id, { form: {
                        firstName: 'Najor'
                    } }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var point = JSON.parse(body);
                        assert.equal(point.firstName, 'Najor');
                        assert.equal(point._id.toString(), id_1.toString());
                        done();
                    }
                    else {
                        done(response.statusCode + " - " + error + "\n " + body);
                    }
                });
            }
            else {
                done(error);
            }
        });
    });
});
