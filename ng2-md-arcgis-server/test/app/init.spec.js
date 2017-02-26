/**
 * Created by najorcruzcruz on 14/7/16.
 */
"use strict";
var testing_1 = require("@angular/core/testing");
var testing_2 = require('@angular/platform-browser-dynamic/testing');
testing_1.setBaseTestProviders(testing_2.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, testing_2.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);
beforeAll(function () {
    ARCGIS_MODULE.getAddress = function () {
        return new Promise(function (fulfill, reject) {
            fulfill({
                address: {
                    Match_addr: 'Super calle callejon'
                },
                location: {
                    latitude: -20.23,
                    longitude: 12.003
                }
            });
        });
    };
});
//# sourceMappingURL=init.spec.js.map