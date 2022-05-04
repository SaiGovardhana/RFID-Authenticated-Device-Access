import EventEmitter from "events";
import { Request } from "express";
import {WebSocket,  MessageEvent, CloseEvent } from "ws";
/**
 * @event clientdata  When data is recieved
 * @event closed When socket closed
 */
export class WebSocketHandler extends EventEmitter
{
    public ws:WebSocket;
    public isValidated:boolean;
    constructor(ws:WebSocket,req:Request)
    {   
        super();
        console.log("Creating A WebHandler");
        this.isValidated=false;
        this.ws=ws;
        ws.onmessage=this.readMessageFromClient.bind(this);
        ws.onclose=this.connectionClosedByClient.bind(this);
    }

    public sendMessageToClient(message:string)
    {   
        this.ws.send(message);
    }

    public readMessageFromClient(event:MessageEvent):void
    {
        console.log("Recieved A Message From the Client "+event.data);
        this.emit('clientdata',event.data);   
    }

    public closeConnection()
    {   
        this.ws.close();
    }

    public connectionClosedByClient(event:CloseEvent):void
    {
        console.log("ConnectionClosedByTheClient!");
        this.emit('closed');
    }


}