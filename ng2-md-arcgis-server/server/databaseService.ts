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

export class DatabaseService {

    disconnect() {
        mongoose.disconnect();
    }

    connect(url: string) {
        mongoose.connect(url);
    }

    getPoints() {
        return PointModel.find().exec();
    }

    getPoint(id: string) {
        return PointModel.findById(id).exec();
    }

    savePoint(params: any) {
        let point = new PointModel(params);
        return point.save();
    }

    removePoint(id: string) {
        return PointModel.findById(id).remove().exec();
    }

    removePointLastName(lastName: string) {
        return PointModel.find({ lastName: lastName }).remove().exec();
    }

    updatePoint(pointUpdate: any) {
        let id = pointUpdate._id;
        delete pointUpdate._id;

        return PointModel.findByIdAndUpdate(id, pointUpdate, {
            'new': true
        }).exec();

    }
}