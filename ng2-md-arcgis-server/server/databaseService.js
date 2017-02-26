"use strict";
/**
 * Created by najorcruzcruz on 7/7/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
// create a schema
var pointSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    contactNumber: String,
    latitude: Number,
    longitude: Number,
    address: String,
    ip: String
});
// the schema is useless so far
// we need to create a model using it
var PointModel = mongoose.model('Point', pointSchema);
var DatabaseService = (function () {
    function DatabaseService() {
    }
    DatabaseService.prototype.disconnect = function () {
        mongoose.disconnect();
    };
    DatabaseService.prototype.connect = function (url) {
        mongoose.connect(url);
    };
    DatabaseService.prototype.getPoints = function () {
        return PointModel.find().exec();
    };
    DatabaseService.prototype.getPoint = function (id) {
        return PointModel.findById(id).exec();
    };
    DatabaseService.prototype.savePoint = function (params) {
        var point = new PointModel(params);
        return point.save();
    };
    DatabaseService.prototype.removePoint = function (id) {
        return PointModel.findById(id).remove().exec();
    };
    DatabaseService.prototype.removePointLastName = function (lastName) {
        return PointModel.find({ lastName: lastName }).remove().exec();
    };
    DatabaseService.prototype.updatePoint = function (pointUpdate) {
        var id = pointUpdate._id;
        delete pointUpdate._id;
        return PointModel.findByIdAndUpdate(id, pointUpdate, {
            'new': true
        }).exec();
    };
    return DatabaseService;
}());
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=databaseService.js.map