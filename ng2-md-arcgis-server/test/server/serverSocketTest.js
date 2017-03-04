/**
 * Created by najorcruzcruz on 13/7/16.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contantsTest_1 = require("./contantsTest");
var constants_1 = require("../../app/constants");
var server_1 = require("../../server/server");
var databaseService_1 = require("../../server/databaseService");
var io = require("socket.io-client");
var http = require('http');
var request = require('request');
var assert = require('assert');
describe('Server Socket test', function () {
    var server;
    var dataService;
    before(function () {
        dataService = new databaseService_1.DatabaseService();
        server = new server_1.NodeServer(3000, dataService);
        server.initDevMode();
    });
    after(function () {
        server.close();
        dataService.removePointLastName(contantsTest_1.LAST_NAME_TEST);
        dataService.disconnect();
    });
    it('Socket new Point', function (done) {
        var data = {
            firstName: 'Jose', lastName: contantsTest_1.LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        };
        var socket = io('http://localhost:3000');
        socket.on(constants_1.EMIT_NEW_POINT, function (data) {
            assert.equal(data.firstName, 'Jose');
            socket.disconnect();
            done();
        });
        request.post('http://localhost:3000/api/points', { form: data }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
            }
            else {
                done(response.statusCode + " - " + error + "\n" + body);
            }
        });
    });
    it('Delete socket new Point', function (done) {
        var data = {
            firstName: 'Jose', lastName: contantsTest_1.LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        };
        var socket = io('http://localhost:3000');
        socket.on(constants_1.EMIT_REMOVED_POINT, function (point) {
            assert.equal(point.firstName, 'Jose');
            socket.disconnect();
            done();
        });
        request.post('http://localhost:3000/api/points', { form: data }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var newPoint = JSON.parse(body);
                request.del("http://localhost:3000/api/points/" + newPoint._id, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
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
    it('Update Socket new Point', function (done) {
        var data = {
            firstName: 'Jose', lastName: contantsTest_1.LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        };
        var socket = io('http://localhost:3000');
        socket.on(constants_1.EMIT_UPDATED_POINT, function (data) {
            assert.equal(data.firstName, 'Najor');
            socket.disconnect();
            done();
        });
        request.post('http://localhost:3000/api/points', { form: data }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var newPoint = JSON.parse(body);
                var id = newPoint._id;
                request.put("http://localhost:3000/api/points/" + newPoint._id, { form: {
                        firstName: 'Najor'
                    } }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
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
