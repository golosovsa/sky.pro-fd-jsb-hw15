const weatherTemplate = {
    tag: "div",
    cls: ["weather", ],
    attrs: {
        title: "",
    },
    content: [
        {
            tag: "img",
            cls: ["weather__item", "weather__item_box1", "weather__icon", ],
            attrs: {
                src: "",
                alt: "",
            },
        },
        {
            tag: "div",
            cls: ["weather__item", "weather__item_box2", ],
            content: [
                {
                    tag: "p",
                    cls: ["weather__text", "weather__text_country-short", ],
                },
                {
                    tag: "p",
                    cls: ["weather__text", "weather__text_temperature", ],
                },
            ],
        },
        {
            tag: "div",
            cls: ["weather__item", "weather__item_box3", ],
            content: [
                {
                    tag: "input",
                    cls: ["weather__input", "weather__input_city"],
                    attrs: {
                        type: "text",
                    },
                },
            ],
        },
        {
            tag: "div",
            cls: ["weather__item", "weather__item_box4", ],
            content: [
                {
                    tag: "p",
                    cls: ["weather__text", "weather__text_geo-enabled", "weather__hidden", ],
                    content: [
                        {
                            tag: "i",
                            cls: ["fas", "fa-map", ]
                        },
                    ],
                },
                {
                    tag: "p",
                    cls: ["weather__text", "weather__text_geo-disabled", ],
                    content: [
                        {
                            tag: "i",
                            cls: ["fas", "fa-map-marked", ]
                        },
                    ],
                },
            ],
        },
    ],
}