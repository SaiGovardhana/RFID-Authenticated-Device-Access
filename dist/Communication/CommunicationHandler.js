export class CommunicationHandler {
    users;
    currentClientHandler;
    usbHandler;
    constructor(users, currentClientHandler, usbHandler) {
        this.users = users;
        this.currentClientHandler = currentClientHandler;
        this.usbHandler = usbHandler;
        usbHandler.on('rfiddata', this.interpretRfid.bind(this));
        currentClientHandler?.on('clientdata', this.interpretClient.bind(this));
    }
    setUser(currentClientHandler) {
        this.currentClientHandler = currentClientHandler;
        currentClientHandler.on('clientdata', this.interpretClient.bind(this));
    }
    removeUser() {
        if (this.currentClientHandler != null) {
            this.currentClientHandler.removeAllListeners('clientdata');
            if (this.currentClientHandler.isValidated)
                this.usbHandler.dataSender('102');
        }
        this.currentClientHandler = null;
    }
    interpretRfid(message) {
        //No user logged in
        if (this.currentClientHandler == null)
            return;
        //User Valid
        if (this.currentClientHandler.isValidated || this.users[message] != undefined) { //Already Logged In
            if (this.currentClientHandler.isValidated == true) { //Verify If It is a command
                if (message.length < 8)
                    this.currentClientHandler.sendMessageToClient(`{"code":"${message}"}`);
            }
            else { //Log In
                this.currentClientHandler.isValidated = true;
                this.currentClientHandler.sendMessageToClient(`{"code":"101","id":"${message}","name":"${this.users[message]}"}`);
                this.usbHandler.dataSender('101');
            }
        }
    }
    interpretClient(message) {
        if (this.currentClientHandler != null)
            if (this.currentClientHandler.isValidated)
                this.usbHandler.dataSender(message.trim());
    }
}
