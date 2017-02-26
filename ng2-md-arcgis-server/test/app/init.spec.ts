/**
 * Created by najorcruzcruz on 14/7/16.
 */

import { setBaseTestProviders } from "@angular/core/testing";
import {
    TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,
    TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
} from '@angular/platform-browser-dynamic/testing';

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

declare var ARCGIS_MODULE: any;

beforeAll(() => {
    ARCGIS_MODULE.getAddress = () => {
        return new Promise((fulfill, reject) => {
            fulfill({
                address: {
                    Match_addr: 'Super calle callejon'
                },
                location: {
                    latitude: -20.23,
                    longitude: 12.003
                }
            });
        })
    };
});

