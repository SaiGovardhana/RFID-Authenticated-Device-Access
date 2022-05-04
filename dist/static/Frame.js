export class Frame {
    element;
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('Frame');
    }
    getHtmlObject() {
        return this.element;
    }
}
