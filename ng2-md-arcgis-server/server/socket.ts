/**
 * Created by najorcruzcruz on 8/7/16.
 */
import socketIo = require('socket.io');
import { Server } from "http";
import { EMIT_NEW_POINT, EMIT_UPDATED_POINT, EMIT_REMOVED_POINT } from "../app/constants";

export class PointSocket {
    io: any;
    sockets: any;

    constructor(private server: Server, private callback?: Function) {
        this.io = require('socket.io').listen(this.server);

        this.io.set("origins", "*:*");

        this.io.on('connection', (socket: any) => {
            if (callback) {
                callback();
            }
        });
    }

    emit(message: string, params: any) {
        this.io.sockets.emit(message, params);
    }

    emitNewPoint(point: any) {
        this.emit(EMIT_NEW_POINT, point);
    }

    emitUpdatePoint(point: any) {
        this.emit(EMIT_UPDATED_POINT, point);
    }

    emitRemovePoint(point: any) {
        this.emit(EMIT_REMOVED_POINT, point);
    }
}