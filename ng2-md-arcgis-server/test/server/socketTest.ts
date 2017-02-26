/**
 * Created by najorcruzcruz on 12/7/16.
 */

import * as io from "socket.io-client";
import { PointSocket } from "../../server/socket";
import http = require('http');
import express = require("express");
import { EMIT_NEW_POINT, EMIT_UPDATED_POINT, EMIT_REMOVED_POINT } from "../../app/constants";
const assert = require('assert');


describe('Socket', () => {

    let pointSocket: PointSocket;
    let socket: any;

    before((done) => {
        let server = http.createServer(express());
        server.listen(3000);
        pointSocket = new PointSocket(server, done);
        socket = io('http://localhost:3000');
    });

    it('New point', done => {
        socket.on(EMIT_NEW_POINT, (data: any) => {
            assert.equal(data.firstName, 'name');
            done();
        });

        pointSocket.emitNewPoint({ firstName: 'name' });
    });

    it('Point updated', done => {
        socket.on(EMIT_UPDATED_POINT, (data: any) => {
            assert.equal(data.firstName, 'name');
            done();
        });

        pointSocket.emitUpdatePoint({ firstName: 'name' });
    });

    it('Point removed', done => {
        socket.on(EMIT_REMOVED_POINT, (data: any) => {
            assert.equal(data.firstName, 'name');
            done();
        });

        pointSocket.emitRemovePoint({ firstName: 'name' });
    });
});
