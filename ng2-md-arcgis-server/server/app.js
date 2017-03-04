/**
 * Created by najorcruzcruz on 12/7/16.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var server = new server_1.NodeServer(3000);
server.initDevMode();
console.log(' Running Points application. Go to: http://localhost:3000');
