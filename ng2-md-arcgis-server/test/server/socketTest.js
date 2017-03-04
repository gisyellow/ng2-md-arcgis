/**
 * Created by najorcruzcruz on 12/7/16.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
var socket_1 = require("../../server/socket");
var http = require("http");
var express = require("express");
var constants_1 = require("../../app/constants");
var assert = require('assert');
describe('Socket', function () {
    var pointSocket;
    var socket;
    before(function (done) {
        var server = http.createServer(express());
        server.listen(3000);
        pointSocket = new socket_1.PointSocket(server, done);
        socket = io('http://localhost:3000');
    });
    it('New point', function (done) {
        socket.on(constants_1.EMIT_NEW_POINT, function (data) {
            assert.equal(data.firstName, 'name');
            done();
        });
        pointSocket.emitNewPoint({ firstName: 'name' });
    });
    it('Point updated', function (done) {
        socket.on(constants_1.EMIT_UPDATED_POINT, function (data) {
            assert.equal(data.firstName, 'name');
            done();
        });
        pointSocket.emitUpdatePoint({ firstName: 'name' });
    });
    it('Point removed', function (done) {
        socket.on(constants_1.EMIT_REMOVED_POINT, function (data) {
            assert.equal(data.firstName, 'name');
            done();
        });
        pointSocket.emitRemovePoint({ firstName: 'name' });
    });
});
