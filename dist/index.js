import { UsbHandler } from "./SerialCommunication/UsbHandler.js";
import { WebServer } from "./WebServer/Application.js";
let usbHandler = new UsbHandler('COM5', { baudRate: 9600 });
let app = new WebServer(process.argv[2] ? process.argv[2] : "localhost", 4292, usbHandler);
