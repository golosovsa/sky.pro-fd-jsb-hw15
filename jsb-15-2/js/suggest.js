class Suggest {
    constructor(parent, data, callback,) {
        if (!parent instanceof HTMLElement) {
            throw "The 'parent' parameter must be an HTMLElement instance.";
        }

        this.parent = parent;
        this.element = templateEngine(suggestTemplate);
        this.data = data;
        this.callback = callback;
        this.maxElementCount = 12;

        this.hidden = undefined;
        this.enter = undefined;
        this.mustHide = undefined;
        this.hide();

        this.templateItem = document.createElement("a");
        this.templateItem.classList.add("suggest__item");

        this.onClick = this.onClick.bind(this);
        this.onLeave = this.onLeave.bind(this);
        this.onEnter = this.onEnter.bind(this);

        this.element.addEventListener("click", this.onClick, true);
        this.element.addEventListener("mouseenter", this.onEnter);
        this.element.addEventListener("mouseleave", this.onLeave);

        parent.appendChild(this.element);
    }

    setPosition({
        left = "auto",
        top = "auto",
        right = "auto",
        bottom = "auto",
    }) {
        this.element.style = `left: ${left}; top: ${top}; right: ${right}; bottom: ${bottom};`;
    }

    show() {
        this.hidden = false;
        this.element.classList.remove("suggest__hidden");
    }

    hide() {
        if (this.enter) {
            this.mustHide = true;
            return;
        }
        this.hidden = true;
        this.element.classList.add("suggest__hidden");
    }

    update(substring) {
        while (this.element.firstElementChild) {
            this.element.removeChild(this.element.firstElementChild);
        }

        let count = 0;
        for (const city of this.data) {
            if (!city.name.toLowerCase().startsWith(substring)) continue;

            count++;
            const newItem = this.templateItem.cloneNode(false);
            newItem.textContent = city.name;
            newItem.dataset.name = city.name;
            newItem.dataset.lan = city.lat;
            newItem.dataset.lng = city.lng;
            this.element.appendChild(newItem);
            if (count >= this.maxElementCount) break;
        } 
    }

    onClick(event) {
        console.log(event);

        const target = event.target;

        if (!"suggest__item" in target.classList) return;

        event.preventDefault();
        event.stopPropagation();

        const name = target.dataset.name;
        const lan = target.dataset.lan;
        const lng = target.dataset.lng;

        this.callback({
            name: name,
            lan: lan, 
            lng: lng,
        });
    }

    onEnter(event) {
        this.enter = true;
    }

    onLeave(event) {
        this.enter = false;
        if (this.mustHide) {
            this.mustHide = false;
            this.hidden = true;
            this.element.classList.add("suggest__hidden");
        }
    }
}