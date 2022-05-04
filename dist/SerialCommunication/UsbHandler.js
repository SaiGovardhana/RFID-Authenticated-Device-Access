import EventEmitter from "events";
import SerialPort from "serialport";
/**
 * Class For handling USB transfer
 *
 * */
export class UsbHandler extends EventEmitter {
    serialport;
    buffer;
    constructor(usbport, baudrate) {
        super();
        this.buffer = "";
        this.serialport = new SerialPort(usbport, baudrate);
        this.serialport.on('data', (message) => this.dataReciever(message));
        this.serialport.on('error', (e) => console.log("Error In Port"));
    }
    dataReciever(message) {
        let curMessage = message.toString('ascii');
        this.buffer += curMessage;
        if (curMessage.endsWith('\n')) {
            this.emit('rfiddata', this.buffer.trim());
            this.buffer = "";
        }
    }
    dataSender(message) {
        this.serialport.write(message + "\n");
    }
}
