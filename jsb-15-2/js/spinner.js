class Spinner {
    constructor(parent) {
        if (!parent instanceof HTMLElement) {
            throw "The 'parent' parameter must be an HTMLElement instance.";
        }

        this.parent = parent;
        this.spinner = templateEngine(spinnerTemplate);
        this.show();
    }

    show() {
        if (this.spinner.parentElement !== this.parent)
            this.parent.appendChild(this.spinner);
    }
    
    hide() {
        if (this.spinner.parentElement === this.parent)
            this.parent.removeChild(this.spinner);
    }
}