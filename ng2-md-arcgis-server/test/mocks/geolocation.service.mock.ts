/**
 * Created by najorcruzcruz on 14/7/16.
 */


export class GeolocationServiceMock {

    getLocation() {
        return new Promise((fulfill, reject) => {
            fulfill({});
        });
    }

    getIpAddress() {
        return new Promise((fulfill, reject) => {
            fulfill('192.168.1.1');
        });
    }
}