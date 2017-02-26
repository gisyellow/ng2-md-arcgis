/**
 * Created by najorcruzcruz on 13/7/16.
 */
"use strict";
var HttpMock = (function () {
    function HttpMock() {
        var _this = this;
        this.toPromise = {
            toPromise: function () { return new Promise(function (fulfill, reject) {
                fulfill({
                    json: function () {
                        return _this.returnedData;
                    }
                });
            }); },
            subscribe: function () {
            }
        };
    }
    HttpMock.prototype.setReturnedData = function (data) {
        this.returnedData = data;
    };
    HttpMock.prototype.get = function () {
        return this.toPromise;
    };
    HttpMock.prototype.post = function () {
        return this.toPromise;
    };
    HttpMock.prototype.delete = function () {
        return this.toPromise;
    };
    HttpMock.prototype.put = function () {
        return this.toPromise;
    };
    return HttpMock;
}());
exports.HttpMock = HttpMock;
//# sourceMappingURL=http.mock.js.map