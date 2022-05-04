import express from "express";
import expressWs from "express-ws";
import { CommunicationHandler } from "../Communication/CommunicationHandler.js";
import { WebSocketHandler } from "./WebSocketHandler.js";
export class WebServer {
    users;
    HttpServer;
    WSServer;
    currentClientHandler;
    workingDir;
    usbHandler;
    communicationHandler;
    constructor(ip, port, usbHandler) {
        this.usbHandler = usbHandler;
        this.currentClientHandler = null;
        this.users = { "53 C9 F0 38": "Sai Govardhan" };
        this.communicationHandler = new CommunicationHandler(this.users, null, usbHandler);
        this.workingDir = globalThis.process.cwd() + "\\dist\\static\\";
        this.HttpServer = express();
        this.WSServer = expressWs(this.HttpServer);
        this.WSServer.app.ws("/", this.createAWebSocket.bind(this));
        this.HttpServer.get("/*", this.serveStaticContent.bind(this));
        this.HttpServer.listen(port, ip, () => console.log(`Server Listening on ${ip}:${port} ....`));
    }
    createAWebSocket(ws, req) {
        if (this.currentClientHandler != null) {
            console.log("User Already Present!");
            ws.close();
            return;
        }
        this.currentClientHandler = new WebSocketHandler(ws, req);
        this.communicationHandler.setUser(this.currentClientHandler);
        this.currentClientHandler.on('closed', this.ClientConnectionClosed.bind(this));
    }
    ClientConnectionClosed() {
        console.log("Current Client Has Been Removed From App....");
        this.communicationHandler.removeUser();
        this.currentClientHandler = null;
    }
    serveStaticContent(req, res) {
        console.log("Requested File! " + req.url);
        res.sendFile(this.workingDir + req.url);
    }
}
