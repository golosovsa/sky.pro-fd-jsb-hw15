class Popup{
    constructor(parent) {
        this.parent = parent;
        this.node = templateEngine(popupTemplate);
        this.node.childNodes[0].textContent = "Более подробно";
    }

    setPosition({left = "auto", top = "auto", right = "auto", bottom = "auto"}) {
        const positionStyle = `left: ${left}; top: ${top}; right: ${right}; bottom: ${bottom};`; 
        this.node.style = positionStyle;
    }

    show() {
        if (this.node.parentNode !== this.parent)
            this.parent.appendChild(this.node)
    }

    hide() {
        this.parent.removeChild(this.node);
    }

    add(text) {
        const newLine = document.createElement("p");
        newLine.classList.add("popup__text");
        newLine.textContent = text;
        this.node.appendChild(newLine);
    }
}