
export class Frame
{   
    protected element:HTMLDivElement;
    constructor()
    {
        this.element=document.createElement('div');
        this.element.classList.add('Frame');
       
    }
    public getHtmlObject():HTMLDivElement
    {
        return this.element;
    }

}