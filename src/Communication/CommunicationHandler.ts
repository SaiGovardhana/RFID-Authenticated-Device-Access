import { UsbHandler } from "../SerialCommunication/UsbHandler.js";
import { WebSocketHandler } from "../WebServer/WebSocketHandler.js";

export class CommunicationHandler
{
    constructor(public users:{[key:string]:string},public currentClientHandler:WebSocketHandler|null,public usbHandler:UsbHandler)
        {
                usbHandler.on('rfiddata',this.interpretRfid.bind(this));
                currentClientHandler?.on('clientdata',this.interpretClient.bind(this));
        }

    public setUser(currentClientHandler:WebSocketHandler):void
    {
        this.currentClientHandler=currentClientHandler;
        currentClientHandler.on('clientdata',this.interpretClient.bind(this));
    }
    public removeUser():void
    {   if(this.currentClientHandler!=null)
        {   this.currentClientHandler.removeAllListeners('clientdata');
            if(this.currentClientHandler.isValidated)
                this.usbHandler.dataSender('102');
        }
        this.currentClientHandler=null;
       
    }
    public interpretRfid(message:string):void
    {
                //No user logged in
        if( this.currentClientHandler == null)
            return ;
        //User Valid
        if( this.currentClientHandler.isValidated||this.users[message]!=undefined)
            {   //Already Logged In
                if(this.currentClientHandler.isValidated==true)
                    {   //Verify If It is a command
                        if(message.length<8)
                            this.currentClientHandler.sendMessageToClient(`{"code":"${message}"}`);
                    }
                else
                {   //Log In
                    this.currentClientHandler.isValidated=true;
                    this.currentClientHandler.sendMessageToClient(`{"code":"101","id":"${message}","name":"${this.users[message]}"}`);
                    this.usbHandler.dataSender('101');
                }
            }

    }
    
    public interpretClient(message:string):void
    {   if(this.currentClientHandler!=null)
            if(this.currentClientHandler.isValidated)
                this.usbHandler.dataSender(message.trim());
    }

}