/**
 * Created by najorcruzcruz on 7/7/16.
 */
import * as express from "express";
import path = require("path");
import { DatabaseService } from "./databaseService";
import { PointSocket } from "./socket";
import http = require('http');
import { Server } from "http";
import { Point } from "../../ng2-md-arcgis-front/src/app/models/point";
import { readConfigFile } from "./utils";

const bodyParser = require('body-parser');

export class NodeServer {

    socket: PointSocket;
    app: any;
    server: Server;
    dataService: DatabaseService;
    config: any;

    constructor(private port: number, dataService?: DatabaseService) {
        this.config = readConfigFile();
        this.app = express();

        this.server = http.createServer(this.app);
        this.server.listen(port);

        this.dataService = dataService || new DatabaseService();
        this.socket = new PointSocket(this.server);

        this.app.use(bodyParser.json());

        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });


        this.app.get('/api/points/', (req: any, res: any) => {
            this.dataService.getPoints()
                .then((points: Point[]) => {
                    res.json(points);
                })
                .catch((error: any) => {
                    this.errorHandler(error, res)
                });
        });

        this.app.post('/api/points/', (req: any, res: any) => {
            let point = req.body;
            this.dataService.savePoint(point)
                .then((point: Point) => {
                    this.socket.emitNewPoint(point);
                    res.json(point);
                })
                .catch((error: any) => {
                    this.errorHandler(error, res)
                });

        });

        this.app.get('/api/points/:id', (req: any, res: any) => {
            this.dataService.getPoint(req.params.id)
                .then((point: Point) => {
                    res.json(point);
                })
                .catch((error: any) => {
                    this.errorHandler(error, res)
                });
        });

        this.app.delete('/api/points/:id', (req: any, res: any) => {
            let removedPoint: Point;
            this.dataService.getPoint(req.params.id).then((point: Point) => {
                removedPoint = point;
                return this.dataService.removePoint(req.params.id)
            }).then((result: any) => {
                this.socket.emitRemovePoint(removedPoint);
                res.json(result.result);
            }).catch((error: any) => {
                this.errorHandler(error, res)
            });
        });

        this.app.put('/api/points/:id', (req: any, res: any) => {
            let pointUpdate = req.body;
            pointUpdate._id = req.params.id;
            this.dataService.updatePoint(pointUpdate)
                .then((point: any) => {
                    this.socket.emitUpdatePoint(point);
                    res.json(point);
                })
                .catch((error: any) => {
                    this.errorHandler(error, res)
                });
        });
    }


    errorHandler(error: any, res: any) {
        res.status(500);
        res.json({ error: error });
    }

    close() {
        this.server.close();
    }

    initDevMode() {
        this.dataService.connect(this.config.mongodb.test.url);
        this.app.use(express.static(path.normalize(__dirname + '/../../ng2-md-arcgis-front/dist')));
    }

    initDist() {
        this.dataService.connect(this.config.mongodb.prod.url);
        this.app.use(express.static(path.normalize(__dirname + '/../../ng2-md-arcgis-front/dist')));
    }
}

