/**
 * Created by najorcruzcruz on 12/7/16.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var databaseService_1 = require("../../server/databaseService");
var assert = require("assert");
var contantsTest_1 = require("./contantsTest");
var utils_1 = require("../../server/utils");
describe('Data Service', function () {
    var dataService;
    var pointId;
    before(function (done) {
        var config = utils_1.readConfigFile();
        dataService = new databaseService_1.DatabaseService();
        dataService.connect(config.mongodb.test.url);
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
        dataService.removePointLastName(contantsTest_1.LAST_NAME_TEST);
        dataService.disconnect();
    });
    it('Get Points', function (done) {
        dataService.getPoints()
            .then(function (doors) {
            assert.ok(doors.length > 0, 'The test database is empty. Fill it up.');
            assert.equal(typeof doors[0]._id, 'object');
            done();
        })
            .catch(function (error) {
            done(error);
        });
    });
    it('Get Point', function (done) {
        dataService.getPoint(pointId)
            .then(function (door) {
            assert.equal(typeof door, 'object');
            assert.equal(typeof door.firstName, 'string');
            assert.equal(typeof door.email, 'string');
            done();
        })
            .catch(function (error) {
            done(error);
        });
    });
    it('Save Point', function (done) {
        dataService.savePoint({
            firstName: 'Jose', lastName: contantsTest_1.LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        }).then(function (point) {
            assert.equal(point.firstName, 'Jose');
            assert.equal(point.lastName, contantsTest_1.LAST_NAME_TEST);
            assert.equal(point.longitude, -16.3213076);
            done();
        }).catch(function (error) {
            done(error);
        });
    });
    it('Remove Point', function (done) {
        dataService.savePoint({
            firstName: 'Jose', lastName: contantsTest_1.LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        }).then(function (point) {
            return dataService.removePoint(point._id);
        }).then(function (result) {
            assert.equal(result.result.ok, 1);
            done();
        }).catch(function (error) {
            done(error);
        });
    });
    it('Update Point', function (done) {
        var savedId;
        dataService.savePoint({
            firstName: 'Jose', lastName: contantsTest_1.LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        }).then(function (point) {
            savedId = point._id;
            return dataService.updatePoint({
                _id: point._id,
                firstName: 'Najor'
            });
        }).then(function (point) {
            assert.equal(point.firstName, 'Najor');
            assert.equal(point._id.toString(), savedId.toString());
            done();
        }).catch(function (error) {
            done(error);
        });
    });
});
