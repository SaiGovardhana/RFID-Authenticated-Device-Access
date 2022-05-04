import EventEmitter from "events";
/**
 * @event clientdata  When data is recieved
 * @event closed When socket closed
 */
export class WebSocketHandler extends EventEmitter {
    ws;
    isValidated;
    constructor(ws, req) {
        super();
        console.log("Creating A WebHandler");
        this.isValidated = false;
        this.ws = ws;
        ws.onmessage = this.readMessageFromClient.bind(this);
        ws.onclose = this.connectionClosedByClient.bind(this);
    }
    sendMessageToClient(message) {
        this.ws.send(message);
    }
    readMessageFromClient(event) {
        console.log("Recieved A Message From the Client " + event.data);
        this.emit('clientdata', event.data);
    }
    closeConnection() {
        this.ws.close();
    }
    connectionClosedByClient(event) {
        console.log("ConnectionClosedByTheClient!");
        this.emit('closed');
    }
}
