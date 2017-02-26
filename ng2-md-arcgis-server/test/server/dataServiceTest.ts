/**
 * Created by najorcruzcruz on 12/7/16.
 */

import { DatabaseService } from "../../server/databaseService";
import * as assert from 'assert';
import { LAST_NAME_TEST } from "./contantsTest";
import { readConfigFile } from "../../server/utils";

describe('Data Service', () => {

    let dataService: DatabaseService;
    let pointId: string;

    before(done => {
        let config = readConfigFile();
        dataService = new DatabaseService();
        dataService.connect(config.mongodb.test.url);

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

    after(() => {
        dataService.removePointLastName(LAST_NAME_TEST);
        dataService.disconnect();
    });

    it('Get Points', done => {
        dataService.getPoints()
            .then((doors: any) => {
                assert.ok(doors.length > 0, 'The test database is empty. Fill it up.');
                assert.equal(typeof doors[0]._id, 'object');
                done();
            })
            .catch((error: Error) => {
                done(error);
            });
    });

    it('Get Point', done => {
        dataService.getPoint(pointId)
            .then((door: any) => {
                assert.equal(typeof door, 'object');
                assert.equal(typeof door.firstName, 'string');
                assert.equal(typeof door.email, 'string');
                done();
            })
            .catch((error: Error) => {
                done(error);
            });
    });

    it('Save Point', done => {
        dataService.savePoint({
            firstName: 'Jose', lastName: LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        }).then((point: any) => {
            assert.equal(point.firstName, 'Jose');
            assert.equal(point.lastName, LAST_NAME_TEST);
            assert.equal(point.longitude, -16.3213076);
            done();
        }).catch((error: Error) => {
            done(error);
        })
    });

    it('Remove Point', done => {
        dataService.savePoint({
            firstName: 'Jose', lastName: LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        }).then((point: any) => {
            return dataService.removePoint(point._id);
        }).then((result: any) => {
            assert.equal(result.result.ok, 1);
            done();
        }).catch((error: Error) => {
            done(error);
        })
    });

    it('Update Point', done => {
        let savedId: string;
        dataService.savePoint({
            firstName: 'Jose', lastName: LAST_NAME_TEST, email: 'jose@fito.gmail',
            contactNumber: '23234234234', address: 'jose fito address',
            latitude: 28.4666304, longitude: -16.3213076, ip: '19.16.2.3'
        }).then((point: any) => {
            savedId = point._id;
            return dataService.updatePoint({
                _id: point._id,
                firstName: 'Najor'
            });
        }).then((point: any) => {
            assert.equal(point.firstName, 'Najor');
            assert.equal(point._id.toString(), savedId.toString());
            done();
        }).catch((error: Error) => {
            done(error);
        })
    });
});