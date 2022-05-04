import { Frame } from "./Frame.js";

export class ControlFrame extends Frame
{
    public ws:WebSocket;
    public buttons:HTMLButtonElement[];   
    constructor(id:string,name:string,ws:WebSocket,num=3)
    {
        super();
        this.ws=ws;
        this.element.classList.add('ControlFrame');
        this.element.innerHTML=
        `
        <h1>Info:</h1>
        <h2>Card-UID</h2>
        <h3>${id}</h3>
        <h2>Name</h2>
        <h3>${name}</h3>
        <h1>Control:</h1>
        `;
        this.buttons=this.createButtons(num);
        let i=1;
        for(let x of this.buttons)
            {   let temp=document.createElement('h3');
                temp.innerText=`DEVICE ${i}`
                this.element.append(temp);
                this.element.append(x);
                i++;
            }
    }
    
    private clickHandler(event:MouseEvent)
    { let code=0;
        let curButton=null;
        for(let x of this.buttons)
            {
                if(event.target==x)
                {    curButton=x;
                    break;
                }   
            }
        if(curButton==null)
            return ;
        if(curButton.classList.contains('ButtonOff'))
            {
                this.ws.send(`11${Number.parseInt(curButton.id[curButton.id.length-1])+2}`);   
            }
        else
            {
                this.ws.send(`10${Number.parseInt(curButton.id[curButton.id.length-1])+2}`);
            }       
             
    }


    private createButtons(num:number):HTMLButtonElement[]
        {   let buttons:HTMLButtonElement[]=[];
            for(let i=1;i<=num;i++)
            {
                let temp=document.createElement('button');
                temp.classList.add('ButtonOff');
                temp.addEventListener('click',this.clickHandler.bind(this));
                temp.id=`button${i}`
                temp.innerText="OFF";
                buttons.push(temp);
            }
            return buttons;
        }

}