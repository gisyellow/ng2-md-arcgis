/**
 * Created by najorcruzcruz on 13/7/16.
 */

import { LAST_NAME_TEST } from "./contantsTest";
import { EMIT_NEW_POINT, EMIT_UPDATED_POINT, EMIT_REMOVED_POINT } from "../../app/constants";
import { NodeServer } from "../../server/server";
import { DatabaseService } from "../../server/databaseService";
import * as io from "socket.io-client";

const http = require('http');
const request = require('request');
const assert = require('assert');

describe('Server Socket test', () => {

    let server: NodeServer;
    let dataService: DatabaseService;

    before(() => {
        dataService = new DatabaseService();
        server = new NodeServer(3000, dataService);
        server.initDevMode();
    });

    after(function () {
        server.close();
        dataService.removePointLastName(LAST_NAME_TEST);
        dataService.disconnect();
    });

    it('Socket new Point', done => {
        var data = {
            firstName: 'Jose', lastName: LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        };

        let socket = io('http://localhost:3000');

        socket.on(EMIT_NEW_POINT, (data: any) => {
            assert.equal(data.firstName, 'Jose');
            socket.disconnect();
            done();
        });

        request.post(
            'http://localhost:3000/api/points',
            { form: data },
            (error: any, response: any, body: any) => {
                if (!error && response.statusCode == 200) {
                } else {
                    done(`${response.statusCode} - ${error}\n${body}`);
                }
            }
        );
    });

    it('Delete socket new Point', done => {
        var data = {
            firstName: 'Jose', lastName: LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        };

        let socket = io('http://localhost:3000');

        socket.on(EMIT_REMOVED_POINT, (point: any) => {
            assert.equal(point.firstName, 'Jose');
            socket.disconnect();
            done();
        });

        request.post(
            'http://localhost:3000/api/points',
            { form: data },
            (error: any, response: any, body: any) => {
                if (!error && response.statusCode == 200) {
                    var newPoint = JSON.parse(body);

                    request.del(`http://localhost:3000/api/points/${newPoint._id}`,
                        (error: any, response: any, body: any) => {
                            if (!error && response.statusCode == 200) {
                            } else {
                                done(`${response.statusCode} - ${error}\n ${body}`);
                            }
                        });
                } else {
                    done(error);
                }
            }
        );
    });

    it('Update Socket new Point', done => {
        var data = {
            firstName: 'Jose', lastName: LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        };

        let socket = io('http://localhost:3000');

        socket.on(EMIT_UPDATED_POINT, (data: any) => {
            assert.equal(data.firstName, 'Najor');
            socket.disconnect();
            done();
        });

        request.post(
            'http://localhost:3000/api/points',
            { form: data },
            (error: any, response: any, body: any) => {
                if (!error && response.statusCode == 200) {
                    var newPoint = JSON.parse(body);
                    let id = newPoint._id;

                    request.put(`http://localhost:3000/api/points/${newPoint._id}`,
                        {form: {
                            firstName: 'Najor'
                        }},
                        (error: any, response: any, body: any) => {
                            if (!error && response.statusCode == 200) {

                            } else {
                                done(`${response.statusCode} - ${error}\n ${body}`);
                            }
                        });
                } else {
                    done(error);
                }
            }
        );
    });
});