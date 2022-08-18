class Popup{
    constructor(parent, message, position, lifetime) {
        this.parent = parent;
        this.node = templateEngine(popupTemplate);
        this.node.childNodes[0].appendChild(document.createTextNode(message));
        let positionStyle = "";
        ["left", "top", "right", "bottom"].forEach(element => {
            if (element in position) {
                positionStyle = `${positionStyle} ${element}: ${position[element]};`
            }
        }); 
        this.node.style = positionStyle;
        setTimeout(this.kill.bind(this), lifetime)
        this.parent.appendChild(this.node)
    }

    kill() {
        this.node.classList.remove("popup__anim");
        this.node.style.animation = "";
        this.node.offsetHeight;
        this.node.animation = null;
        this.node.classList.add("popup__anim_reverse");
        this.node.addEventListener('animationend', this.remove.bind(this));
    }

    remove() {
        this.parent.removeChild(this.node)    
    }
}