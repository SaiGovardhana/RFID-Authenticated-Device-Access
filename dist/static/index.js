import { Animate } from "./Animator.js";
import { ControlFrame } from "./ControlFrame.js";
import { ErrorFrame } from "./ErrorFrame.js";
import { HomeFrame } from "./HomeFrame.js";
let ws = new WebSocket(`ws://${window.location.hostname}:${window.location.port}`);
let displayer = document.querySelector('#Display');
let homePage = new HomeFrame();
let curPage = homePage;
displayer?.append(homePage.getHtmlObject());
ws.onclose = () => {
    let errorFrame = new ErrorFrame();
    displayer?.append(errorFrame.getHtmlObject());
    Animate(curPage, errorFrame);
    curPage = errorFrame;
};
function webSocketMessageHandler(message) {
    let data = JSON.parse(message.data);
    if (data["code"] == undefined)
        return;
    let code = data["code"];
    if (code == "101") {
        let controlFrame = new ControlFrame(data["id"], data["name"], ws);
        if (displayer != null) {
            displayer.append(controlFrame.getHtmlObject());
            Animate(curPage, controlFrame);
            curPage = controlFrame;
        }
        return;
    }
    else if (code.length == 3) {
        let button = document.querySelector(`#button${Number.parseInt(code[2]) - 2}`);
        if (button != null) {
            if (code[1] == "1") {
                if (button.classList.contains("ButtonOn"))
                    button.classList.remove("ButtonOn");
                if (button.classList.contains("ButtonOff"))
                    button.classList.remove("ButtonOff");
                button.classList.add("ButtonOn");
                button.innerHTML = "ON";
            }
            if (code[1] == "0") {
                if (button.classList.contains("ButtonOn"))
                    button.classList.remove("ButtonOn");
                if (button.classList.contains("ButtonOff"))
                    button.classList.remove("ButtonOff");
                button.classList.add("ButtonOff");
                button.innerHTML = "OFF";
            }
        }
    }
}
ws.onmessage = webSocketMessageHandler;
