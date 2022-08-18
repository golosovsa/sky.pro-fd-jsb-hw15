const ERRORS = {
    login: {
        valueMissing: "А где логин?",
        patternMismatch: "Неправильный логин",
    }
}

class UserLogin {
    constructor(parent, identify, title="Заголовок", handleURL="/") {
        if (!parent instanceof HTMLElement) {
            throw "The 'parent' parameter must be an HTMLElement instance.";
        }

        if (!identify || !identify instanceof String) {
            throw "The 'identify' parameter must be a unique string."
        }

        this.handleURL = handleURL;

        this.form = templateEngine(userLoginTemplate);
        this.login = this.form.querySelector(".login__input_text");

        const titleElement = this.form.querySelector(".login__title");
        titleElement.textContent = title;

        this.form.addEventListener("submit", this.onSubmit.bind(this));

        parent.appendChild(this.form);
    }

    checkValidity() {
        if (!this.login.validity.valid) {

            let errorKey = undefined;

            for (const error of Object.keys(ValidityState.prototype)) {
                if (!this.login.validity[error]) continue;
                errorKey = error;
                break;
            }

            const message = ERRORS[this.login.name][errorKey] || "Неизвестная ошибка";

            const errorPopup = new Popup(
                this.form,
                message,
                {
                    left: "20px",
                    top: "30px",
                    right: "auto",
                    bottom: "auto",
                },
                3000,
            );
            return false;
        }
        return true;
    }

    onSubmit(event) {
        event.preventDefault();
        
        if (!this.checkValidity()) {
            return
        }

        request({
            url: this.handleURL,
            onSuccess: (data) => {
                if (!data) return;
                if (data.status && data.status === "ok") {
                    const SuccessPopup = new Popup(
                        this.form,
                        "Успешный вход!",
                        {
                            left: "20px",
                            top: "30px",
                            right: "auto",
                            bottom: "auto",
                        },
                        3000,
                    );
                } else {
                    const errorPopup = new Popup(
                        this.form,
                        "Логин отклонен!",
                        {
                            left: "20px",
                            top: "30px",
                            right: "auto",
                            bottom: "auto",
                        },
                        3000,
                    );
                }
            },
            onError: () => {
                const errorPopup = new Popup(
                    this.form,
                    "Ошибка запроса!",
                    {
                        left: "20px",
                        top: "30px",
                        right: "auto",
                        bottom: "auto",
                    },
                    3000,
                );
            }
        });
    }
}