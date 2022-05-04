import { Frame } from "./Frame.js";
export class ErrorFrame extends Frame {
    constructor() {
        super();
        this.element.innerHTML = `
        <h1>OOPS!</h1>
        <h2>Connection has ended :(</h2>
       <h2>May be due to:</h2>
      <h3> 1.)Opened somewhere else.</h3>
      <h3> 2.)Session has ended</h3>
      <h3> 3.)You Messed up the code.</h3>
      `;
    }
}
