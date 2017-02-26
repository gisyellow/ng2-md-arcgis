"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by najorcruzcruz on 9/7/16.
 */
var router_1 = require('@angular/router');
var Observable_1 = require('rxjs/Observable');
var ActivatedRouteMock = (function (_super) {
    __extends(ActivatedRouteMock, _super);
    function ActivatedRouteMock() {
        var _this = this;
        _super.call(this);
        this.params = Observable_1.Observable.create(function (observer) {
            _this.observer = observer;
        });
    }
    ActivatedRouteMock.prototype.next = function (id) {
        this.observer.onNext(id);
    };
    return ActivatedRouteMock;
}(router_1.ActivatedRoute));
exports.ActivatedRouteMock = ActivatedRouteMock;
//# sourceMappingURL=activated-route.mock.js.map