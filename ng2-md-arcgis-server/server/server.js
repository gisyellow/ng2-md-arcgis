"use strict";
/**
 * Created by najorcruzcruz on 7/7/16.
 */
var express = require("express");
var path = require("path");
var databaseService_1 = require("./databaseService");
var socket_1 = require("./socket");
var http = require('http');
var utils_1 = require("./utils");
var bodyParser = require('body-parser');
var NodeServer = (function () {
    function NodeServer(port, dataService) {
        var _this = this;
        this.port = port;
        this.config = utils_1.readConfigFile();
        this.app = express();
        this.server = http.createServer(this.app);
        this.server.listen(port);
        this.dataService = dataService || new databaseService_1.DatabaseService();
        this.socket = new socket_1.PointSocket(this.server);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.get('/api/points/', function (req, res) {
            _this.dataService.getPoints()
                .then(function (points) {
                res.json(points);
            })
                .catch(function (error) {
                _this.errorHandler(error, res);
            });
        });
        this.app.post('/api/points/', function (req, res) {
            var point = req.body;
            _this.dataService.savePoint(point)
                .then(function (point) {
                _this.socket.emitNewPoint(point);
                res.json(point);
            })
                .catch(function (error) {
                _this.errorHandler(error, res);
            });
        });
        this.app.get('/api/points/:id', function (req, res) {
            _this.dataService.getPoint(req.params.id)
                .then(function (point) {
                res.json(point);
            })
                .catch(function (error) {
                _this.errorHandler(error, res);
            });
        });
        this.app.delete('/api/points/:id', function (req, res) {
            var removedPoint;
            _this.dataService.getPoint(req.params.id).then(function (point) {
                removedPoint = point;
                return _this.dataService.removePoint(req.params.id);
            }).then(function (result) {
                _this.socket.emitRemovePoint(removedPoint);
                res.json(result.result);
            }).catch(function (error) {
                _this.errorHandler(error, res);
            });
        });
        this.app.put('/api/points/:id', function (req, res) {
            var pointUpdate = req.body;
            pointUpdate._id = req.params.id;
            _this.dataService.updatePoint(pointUpdate)
                .then(function (point) {
                _this.socket.emitUpdatePoint(point);
                res.json(point);
            })
                .catch(function (error) {
                _this.errorHandler(error, res);
            });
        });
    }
    NodeServer.prototype.errorHandler = function (error, res) {
        res.status(500);
        res.json({ error: error });
    };
    NodeServer.prototype.close = function () {
        this.server.close();
    };
    NodeServer.prototype.initDevMode = function () {
        this.dataService.connect(this.config.mongodb.test.url);
        this.app.use('/system-config.js', express.static(path.normalize(__dirname + '/../system-config.js')));
        this.app.use('/app', express.static(path.normalize(__dirname + '/../app')));
        this.app.use('/node_modules', express.static(path.normalize(__dirname + '/../node_modules')));
        this.app.use('/assets/lib/arcgis.js', express.static(path.normalize(__dirname + '/../assets/lib/arcgis.js')));
        this.app.use('/assets/img/', express.static(path.normalize(__dirname + '/../assets/img')));
        var renderIndex = function (req, res) {
            res.sendFile(path.normalize(__dirname + '/../index.html'));
        };
        this.app.get('/*', renderIndex);
    };
    NodeServer.prototype.initDist = function () {
        this.dataService.connect(this.config.mongodb.prod.url);
        this.app.use('/systemjs.config.js', express.static(path.normalize(__dirname + '/../dist/systemjs.config.js')));
        this.app.use('/app', express.static(path.normalize(__dirname + '/../dist/app')));
        this.app.use('/lib', express.static(path.normalize(__dirname + '/../dist/lib')));
        var renderIndex = function (req, res) {
            res.sendFile(path.normalize(__dirname + '/../dist/index.html'));
        };
        this.app.get('/*', renderIndex);
    };
    return NodeServer;
}());
exports.NodeServer = NodeServer;
//# sourceMappingURL=server.js.map