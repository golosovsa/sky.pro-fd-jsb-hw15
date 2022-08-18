const userLoginTemplate = {
    tag: "form",
    cls: ["login", ],
    attrs: {
        method: "GET",
        action: "/",
        novalidate: true,
    },
    content: [
        {
            tag: "div",
            cls: ["login__item", ],
            content: [
                {
                    tag: "h2",
                    cls: ["login__title", ],
                    content: ["title", ],
                },
            ],
        },
        {
            tag: "div",
            cls: ["login__item", ],
            content: [
                {
                    tag: "input",
                    attrs: {
                        type: "text",
                        name: "login",
                        placeholder: "Введите Ваш логин",
                        pattern: "^[a-zA-Z]{1}[a-zA-Z_0-9]{2,19}$",
                        title: "3-20 символов, первый символ - буква, использовать только буквы латинского алфавита, цифры и символ '_'",
                        required: true,
                    },
                    cls: ["login__input", "login__input_text", ],
                },
            ],
        },
        {
            tag: "div",
            cls: ["login__item", ],
            content: [
                {
                    tag: "input",
                    attrs: {
                        type: "submit",
                        value: "Войти",
                    },
                    cls: ["login__input", "login__input_submit", ],
                },
            ],
        },
    ],
}