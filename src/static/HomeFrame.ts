import { Frame } from "./Frame.js";

export class HomeFrame extends Frame
{
    constructor()
    {
        super();
        this.element.classList.add('HomeFrame');
        this.element.innerHTML= ` <h2>An Inter</h2><h2>Disciplinary</h2><h2> Project On</h2>
        <h1>RFID</h1>
        <h1>Based</h1>
        <h2>Security System</h2>
        <h4>Please Scan Your Card To Continue</h4> `  
    }
}