import { UsbHandler } from "./UsbHandler.js";

let usb=new UsbHandler('COM5',{"baudRate":9600});
usb.on('rfiddata',(data)=>console.log(data,data.length));

