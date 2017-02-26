/**
 * Created by najorcruzcruz on 12/7/16.
 */

import { NodeServer } from "./server";

const server:NodeServer = new NodeServer(3000);

server.initDevMode();

console.log(' Running Points application. Go to: http://localhost:3000');