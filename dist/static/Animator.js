export function Animate(from, to) {
    let displayer = document.querySelector("div");
    if (displayer == null)
        return;
    displayer.style["width"] = "200vw";
    from.getHtmlObject().classList.add("MoveLeft");
    to.getHtmlObject().classList.add("MoveLeft");
    console.log("HEREINANIMATE");
    let count = 0;
    function animationEnd() {
        console.log("HEREINEND");
        count++;
        if (count == 2) {
            if (displayer != null)
                displayer.style["width"] = "100vw";
            console.log("HEREINREMOVE");
            from.getHtmlObject().classList.remove("MoveLeft");
            to.getHtmlObject().classList.remove("MoveLeft");
            from.getHtmlObject().remove();
        }
    }
    from.getHtmlObject().onanimationend = animationEnd;
    to.getHtmlObject().onanimationend = animationEnd;
}
