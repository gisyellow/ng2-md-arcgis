/**
 * Created by najorcruzcruz on 12/7/16.
 */

import { NodeServer } from "../../server/server";
import { LAST_NAME_TEST } from "./contantsTest";
import { DatabaseService } from "../../server/databaseService";

const http = require('http');
const request = require('request');
const assert = require('assert');

describe('Server test', () => {

    let server: NodeServer;
    let dataService: DatabaseService;
    let pointId: string;

    before(done => {
        dataService = new DatabaseService();
        server = new NodeServer(3000, dataService);
        server.initDevMode();

        var data = {
            firstName: 'Test 1', lastName: LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        };

        dataService.savePoint(data)
            .then((point: any) => {
                pointId = point._id;
                done();
            })
            .catch((error: any) => {
                done(error);
            })
    });

    after(function () {
        server.close();
        dataService.removePointLastName(LAST_NAME_TEST);
        dataService.disconnect();
    });

    it('should return 200', done => {
        http.get('http://localhost:3000', (res: any) => {
            assert.equal(200, res.statusCode);
            done();
        });
    });

    it('Get Points', done => {
        http.get('http://localhost:3000/api/points', (res: any) => {
            var body = '';
            res.on('data', (chunk: any) => {
                body += chunk;
            });
            res.on('end', () => {
                const json = JSON.parse(body);
                assert.equal(typeof json, 'object');
                assert.ok(json.length > 0, 'Fill up the test database');
                done();
            });

        });
    });

    it('Get Point by id', done => {
        http.get(`http://localhost:3000/api/points/${pointId}`, (res: any) => {
            var body = '';
            res.on('data', (chunk: any) => {
                body += chunk;
            });
            res.on('end', () => {
                const point = JSON.parse(body);
                assert.equal(typeof point, 'object');
                assert.equal(typeof point.firstName, 'string');
                assert.equal(typeof point.email, 'string');
                done();
            });

        });
    });

    it('Put new Point', done => {
        var data = {
            firstName: 'Jose', lastName: LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        };

        request.post(
            'http://localhost:3000/api/points',
            { form: data },
            (error: any, response: any, body: any) => {
                if (!error && response.statusCode == 200) {
                    var newPoint = JSON.parse(body);
                    assert.equal(typeof newPoint, 'object');
                    assert.equal(newPoint.firstName, 'Jose');
                    assert.equal(newPoint.lastName, LAST_NAME_TEST);
                    assert.equal(newPoint.email, 'jose@fito.gmail');
                    done();
                } else {
                    done(`${response.statusCode} - ${error}\n${body}`);
                }
            }
        );
    });


    it('Delete new Point', done => {
        var data = {
            firstName: 'Jose', lastName: LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        };

        request.post(
            'http://localhost:3000/api/points',
            { form: data },
            (error: any, response: any, body: any) => {
                if (!error && response.statusCode == 200) {
                    var newPoint = JSON.parse(body);

                    request.del(`http://localhost:3000/api/points/${newPoint._id}`,
                        (error: any, response: any, body: any) => {
                            if (!error && response.statusCode == 200) {
                                var result = JSON.parse(body);
                                assert.equal(result.ok, 1);
                                done();
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

    it('Update new Point', done => {
        var data = {
            firstName: 'Jose', lastName: LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        };

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
                                var point = JSON.parse(body);
                                assert.equal(point.firstName, 'Najor');
                                assert.equal(point._id.toString(), id.toString());
                                done();
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